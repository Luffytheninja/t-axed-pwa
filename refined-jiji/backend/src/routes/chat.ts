import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database';

const router = express.Router();

// Get user's conversations
router.get('/', async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { buyerId: userId },
          { sellerId: userId },
        ],
      },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            images: true,
            price: true,
          },
        },
        buyer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        seller: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
          select: {
            content: true,
            createdAt: true,
            senderId: true,
          },
        },
        _count: {
          select: { messages: true },
        },
      },
      orderBy: { lastMessageAt: 'desc' },
    });

    res.json({ conversations });
  } catch (error) {
    console.error('Conversations fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get messages in a conversation
router.get('/:conversationId/messages', async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user?.id;
    const { page = 1, limit = 50 } = req.query;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if user is part of conversation
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: {
        buyerId: true,
        sellerId: true,
      },
    });

    if (!conversation || (conversation.buyerId !== userId && conversation.sellerId !== userId)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const messages = await prisma.message.findMany({
      where: { conversationId },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    });

    // Mark messages as read
    await prisma.message.updateMany({
      where: {
        conversationId,
        senderId: { not: userId },
        isRead: false,
      },
      data: { isRead: true },
    });

    const total = await prisma.message.count({ where: { conversationId } });

    res.json({
      messages: messages.reverse(), // Return in chronological order
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('Messages fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Send message
router.post('/:conversationId/messages', [
  body('content').trim().notEmpty().isLength({ max: 1000 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { conversationId } = req.params;
    const userId = req.user?.id;
    const { content } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if user is part of conversation
    const conversation = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: {
        buyerId: true,
        sellerId: true,
        listing: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!conversation || (conversation.buyerId !== userId && conversation.sellerId !== userId)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const message = await prisma.message.create({
      data: {
        conversationId,
        senderId: userId,
        content,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
    });

    // Update conversation's last message timestamp
    await prisma.conversation.update({
      where: { id: conversationId },
      data: { lastMessageAt: new Date() },
    });

    res.status(201).json({
      message: 'Message sent successfully',
      message: message,
    });
  } catch (error) {
    console.error('Message send error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Start new conversation about a listing
router.post('/start/:listingId', async (req, res) => {
  try {
    const { listingId } = req.params;
    const userId = req.user?.id;
    const { initialMessage } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get listing and seller info
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: {
        id: true,
        title: true,
        userId: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.userId === userId) {
      return res.status(400).json({ message: 'Cannot start conversation with yourself' });
    }

    // Check if conversation already exists
    let conversation = await prisma.conversation.findUnique({
      where: {
        listingId_buyerId: {
          listingId,
          buyerId: userId,
        },
      },
    });

    if (!conversation) {
      // Create new conversation
      conversation = await prisma.conversation.create({
        data: {
          listingId,
          buyerId: userId,
          sellerId: listing.userId,
        },
      });

      // Add participants
      await prisma.conversationParticipant.createMany({
        data: [
          { conversationId: conversation.id, userId: userId },
          { conversationId: conversation.id, userId: listing.userId },
        ],
      });

      // Send initial message if provided
      if (initialMessage) {
        await prisma.message.create({
          data: {
            conversationId: conversation.id,
            senderId: userId,
            content: initialMessage,
          },
        });
      }
    }

    res.status(201).json({
      message: 'Conversation started successfully',
      conversation: {
        id: conversation.id,
        listing: {
          id: listing.id,
          title: listing.title,
        },
        seller: {
          id: listing.userId,
          name: `${listing.user.firstName} ${listing.user.lastName}`,
        },
      },
    });
  } catch (error) {
    console.error('Conversation start error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;