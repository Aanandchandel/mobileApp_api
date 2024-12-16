const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  number: { type: String,
    required: true,
    unique: true, // Ensures the mobile number is unique
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'], // Regular expression for valid mobile number
  },
  email: { type: String,
    required: true,
    unique: true, // Ensures the email is unique
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Simple regex for valid email
  },
  amount: {
    type: Number,
    required: true,
    min: 0, // Ensures the amount is non-negative
  },
  currency: {
    type: String,
    default: 'INR',
    enum: ['INR', 'USD', 'EUR'], // Allowed currencies
  },
  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED'],
    default: 'PENDING', // Default status when the transaction is created
  },
  paymentMethod: {
    type: String, // e.g., UPI, Credit Card, Net Banking
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update `updatedAt` before saving the document
transactionSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
