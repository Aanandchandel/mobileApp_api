const mongoose = require('mongoose');

// Define the Schema for the registration form
const registrationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true, // removes extra spaces
  },
  mobile: {
    type: String,
    required: true,
    unique: true, // Ensures the mobile number is unique
    match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number'], // Regular expression for valid mobile number
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensures the email is unique
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Simple regex for valid email
  },
  higherQualification: {
    type: String,
    required: true,
    enum: ['High School', 'Undergraduate', 'Postgraduate', 'Doctorate'], // Enum for possible qualifications
  },
  domain: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 1, // Minimum duration is 1 month
    max: 12, // Maximum duration is 12 months
  },
  mode: {
    type: String,
    required: true,
    enum: ['online', 'offline'], // Enum for the mode of study
  },
  reference: {
    type: String,
    required: true,
    trim: true,
  },
  cv: {
    type: String, // This will store the file path of the uploaded CV
    required: true,
  }
}, { timestamps: true });

// Create a model from the schema
const Registration = mongoose.model('Registration', registrationSchema);

module.exports = Registration;
