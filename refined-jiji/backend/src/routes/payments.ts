import express from 'express';
import { body, validationResult } from 'express-validator';
import { prisma } from '../config/database';

const router = express.Router();

// Initialize payment (for escrow)
router.post('/initialize', [
  body('listingId').notEmpty(),
  body('amount').isFloat({ min: 0 }),
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user?.id;
    const { listingId, amount } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Get listing details
    const listing = await prisma.listing.findUnique({
      where: { id: listingId },
      select: {
        id: true,
        title: true,
        price: true,
        userId: true,
      },
    });

    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: parseFloat(amount),
        type: 'purchase',
        reference: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paymentMethod: 'paystack', // Default to Paystack
      },
    });

    // Here you would integrate with Paystack to initialize the payment
    // For now, we'll return a mock response

    res.json({
      message: 'Payment initialized',
      payment: {
        id: payment.id,
        reference: payment.reference,
        amount: payment.amount,
        status: payment.status,
      },
      listing: {
        id: listing.id,
        title: listing.title,
        sellerId: listing.userId,
      },
      // In real implementation, this would be the Paystack payment URL
      paymentUrl: `https://checkout.paystack.com/${payment.reference}`,
    });
  } catch (error) {
    console.error('Payment initialization error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify payment (webhook from Paystack)
router.post('/verify', async (req, res) => {
  try {
    const { reference, status } = req.body;

    // Find payment by reference
    const payment = await prisma.payment.findUnique({
      where: { reference },
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Update payment status
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: status === 'success' ? 'completed' : 'failed',
        completedAt: status === 'success' ? new Date() : null,
      },
    });

    res.json({
      message: 'Payment verified',
      payment: updatedPayment,
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user's payment history
router.get('/history', async (req, res) => {
  try {
    const userId = req.user?.id;
    const { page = 1, limit = 20 } = req.query;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payments = await prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
    });

    const total = await prisma.payment.count({ where: { userId } });

    res.json({
      payments,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        pages: Math.ceil(total / parseInt(limit as string)),
      },
    });
  } catch (error) {
    console.error('Payment history fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Deposit funds (for sellers)
router.post('/deposit', [
  body('amount').isFloat({ min: 100 }), // Minimum deposit
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user?.id;
    const { amount } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: parseFloat(amount),
        type: 'deposit',
        reference: `DEP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paymentMethod: 'paystack',
      },
    });

    res.json({
      message: 'Deposit initialized',
      payment: {
        id: payment.id,
        reference: payment.reference,
        amount: payment.amount,
        status: payment.status,
      },
      // In real implementation, this would be the Paystack payment URL
      paymentUrl: `https://checkout.paystack.com/${payment.reference}`,
    });
  } catch (error) {
    console.error('Deposit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Withdraw funds (for sellers)
router.post('/withdraw', [
  body('amount').isFloat({ min: 1000 }), // Minimum withdrawal
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.user?.id;
    const { amount, bankDetails } = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Here you would check user's available balance
    // For now, we'll create a withdrawal request

    const payment = await prisma.payment.create({
      data: {
        userId,
        amount: -parseFloat(amount), // Negative for withdrawal
        type: 'withdrawal',
        reference: `WIT_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paymentMethod: 'bank_transfer',
      },
    });

    res.json({
      message: 'Withdrawal request submitted',
      payment: {
        id: payment.id,
        reference: payment.reference,
        amount: payment.amount,
        status: payment.status,
      },
    });
  } catch (error) {
    console.error('Withdrawal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;