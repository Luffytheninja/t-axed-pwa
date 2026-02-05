import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database';

const router = express.Router();

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        avatar: true,
        bio: true,
        location: true,
        isVerified: true,
        verificationBadge: true,
        createdAt: true,
        _count: {
          select: {
            listings: { where: { isActive: true } },
            reviews: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate average rating
    const reviews = await prisma.review.findMany({
      where: { revieweeId: id },
      select: { rating: true },
    });

    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    res.json({
      user: {
        ...user,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: reviews.length,
      },
    });
  } catch (error) {
    console.error('User profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's active listings
router.get('/:id/listings', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const listings = await prisma.listing.findMany({
      where: {
        userId: id,
        isActive: true,
      },
      include: {
        category: true,
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    });

    const total = await prisma.listing.count({
      where: { userId: id, isActive: true },
    });

    res.json({
      listings,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('User listings fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's reviews
router.get('/:id/reviews', async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const reviews = await prisma.review.findMany({
      where: { revieweeId: id },
      include: {
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        listing: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    });

    const total = await prisma.review.count({ where: { revieweeId: id } });

    res.json({
      reviews,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('User reviews fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit review for user
router.post('/:id/reviews', [
  body('rating').isInt({ min: 1, max: 5 }),
  body('comment').optional().isLength({ max: 500 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const reviewerId = req.user?.id; // From auth middleware
    const { id: revieweeId } = req.params;
    const { rating, comment, listingId } = req.body;

    if (!reviewerId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (reviewerId === revieweeId) {
      return res.status(400).json({ message: 'Cannot review yourself' });
    }

    // Check if users have interacted (have a conversation or transaction)
    const hasInteraction = await prisma.conversation.findFirst({
      where: {
        OR: [
          { buyerId: reviewerId, sellerId: revieweeId },
          { buyerId: revieweeId, sellerId: reviewerId },
        ],
      },
    });

    if (!hasInteraction) {
      return res.status(400).json({ message: 'No interaction found with this user' });
    }

    const review = await prisma.review.create({
      data: {
        reviewerId,
        revieweeId,
        listingId,
        rating: parseInt(rating),
        comment,
      },
      include: {
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
        listing: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Review submitted successfully',
      review,
    });
  } catch (error) {
    console.error('Review submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Toggle favorite for user
router.post('/:id/favorite', async (req, res) => {
  try {
    const { id: targetUserId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (userId === targetUserId) {
      return res.status(400).json({ message: 'Cannot favorite yourself' });
    }

    // Check if favorite already exists
    const existingFavorite = await prisma.favorite.findUnique({
      where: {
        userId_listingId: {
          userId,
          listingId: '', // This would need to be updated for user favorites
        },
      },
    });

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: { id: existingFavorite.id },
      });
      res.json({ message: 'User unfavorited', favorited: false });
    } else {
      // For now, we'll skip user favorites and focus on listing favorites
      res.status(400).json({ message: 'User favorites not implemented yet' });
    }
  } catch (error) {
    console.error('Favorite toggle error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;