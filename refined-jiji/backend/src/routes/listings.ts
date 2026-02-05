import express from 'express';

const router = express.Router();

// Get all listings with filters
router.get('/', async (req, res) => {
  try {
    const {
      category,
      location,
      minPrice,
      maxPrice,
      condition,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 20,
    } = req.query;

    const where: any = {
      isActive: true,
    };

    // Add filters
    if (category) {
      where.categoryId = category;
    }

    if (location) {
      where.location = {
        contains: location as string,
        mode: 'insensitive',
      };
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice as string);
      if (maxPrice) where.price.lte = parseFloat(maxPrice as string);
    }

    if (condition) {
      where.condition = condition;
    }

    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } },
        { tags: { hasSome: [search as string] } },
      ];
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        category: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            isVerified: true,
          },
        },
        _count: {
          select: { favorites: true },
        },
      },
      orderBy: {
        [sortBy as string]: sortOrder,
      },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    });

    const total = await prisma.listing.count({ where });

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
    console.error('Listings fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await prisma.listing.findUnique({
      where: { id },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            phone: true,
            isVerified: true,
            verificationBadge: true,
            createdAt: true,
          },
        },
        _count: {
          select: { favorites: true },
        },
      },
    });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Increment view count
    await prisma.listing.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    res.json({ listing });
  } catch (error) {
    console.error('Listing fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new listing
router.post('/', async (req, res) => {
  try {
    const userId = req.user?.id; // From auth middleware

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const {
      title,
      description,
      price,
      categoryId,
      condition,
      location,
      latitude,
      longitude,
      images,
      tags,
    } = req.body;

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        categoryId,
        condition,
        location,
        latitude: latitude ? parseFloat(latitude) : null,
        longitude: longitude ? parseFloat(longitude) : null,
        images: images || [],
        tags: tags || [],
        userId,
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            isVerified: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Listing created successfully',
      listing,
    });
  } catch (error) {
    console.error('Listing creation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update listing
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if listing belongs to user
    const listing = await prisma.listing.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!listing || listing.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const {
      title,
      description,
      price,
      categoryId,
      condition,
      location,
      latitude,
      longitude,
      images,
      tags,
      isActive,
    } = req.body;

    const updatedListing = await prisma.listing.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(categoryId && { categoryId }),
        ...(condition && { condition }),
        ...(location && { location }),
        ...(latitude && { latitude: parseFloat(latitude) }),
        ...(longitude && { longitude: parseFloat(longitude) }),
        ...(images && { images }),
        ...(tags && { tags }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            avatar: true,
            isVerified: true,
          },
        },
      },
    });

    res.json({
      message: 'Listing updated successfully',
      listing: updatedListing,
    });
  } catch (error) {
    console.error('Listing update error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete listing
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if listing belongs to user
    const listing = await prisma.listing.findUnique({
      where: { id },
      select: { userId: true },
    });

    if (!listing || listing.userId !== userId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await prisma.listing.update({
      where: { id },
      data: { isActive: false },
    });

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Listing deletion error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's listings
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 1, limit = 20 } = req.query;

    const listings = await prisma.listing.findMany({
      where: {
        userId,
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
      where: { userId, isActive: true },
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

export default router;