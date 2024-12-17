const fs = require('fs/promises'); // Promises-based fs
const fss = require('fs'); // For non-promises methods like readdir
const path = require('path');
const Registration = require('../models/studentInfo');

// Upload a new file and save registration
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const registrationData = new Registration({
      ...req.body,
      cv: req.file.path // Save file path in database
    });

    await registrationData.save();

    return res.status(201).json({
      message: 'Registration successful',
      data: registrationData
    });
  } catch (err) {
    console.error('Error during upload:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all registrations
const getRegistration = async (req, res) => {
  try {
    const registrations = await Registration.find();

    if (!registrations.length) {
      return res.status(404).json({ success: false, message: 'No registrations found' });
    }

    res.status(200).json({ success: true, registrations });
  } catch (error) {
    console.error('Error retrieving registrations:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Delete a specific registration by ID
const deleteRegistration = async (req, res) => {
  const { id } = req.params;

  try {
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    const filePath = path.resolve(registration.cv);

    try {
      await fs.unlink(filePath);
      console.log('CV file deleted:', filePath);
    } catch (fileError) {
      if (fileError.code !== 'ENOENT') {
        console.error('Error deleting CV file:', fileError);
        return res.status(500).json({ success: false, message: 'Error deleting CV file' });
      }
    }

    await Registration.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: 'User and CV deleted successfully' });
  } catch (error) {
    console.error('Server error during deletion:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get list of all uploaded CVs
const getPdfs = async (req, res) => {
  const uploadDir = path.join(__dirname, '../../uploads');
  console.log('Uploads directory:', uploadDir);

  try {
    const files = await fs.readdir(uploadDir);
    res.status(200).json({ files });
  } catch (err) {
    console.error('Error reading uploads directory:', err);
    res.status(500).json({ message: 'Error reading uploads directory' });
  }
};

// Delete all CVs
const deletegPdfs = async (req, res) => {
  const uploadDir = path.join(__dirname, '../../uploads');
  console.log('Uploads directory:', uploadDir);

  try {
    const files = await fs.readdir(uploadDir);

    const deletionResults = await Promise.allSettled(
      files.map(async (file) => {
        const filePath = path.join(uploadDir, file);
        try {
          await fs.unlink(filePath);
          return { file, status: 'deleted' };
        } catch (err) {
          console.error(`Failed to delete file ${file}:`, err);
          return { file, status: 'error', error: err.message };
        }
      })
    );

    res.status(200).json({ message: 'CV deletion complete', results: deletionResults });
  } catch (err) {
    console.error('Error deleting CVs:', err);
    res.status(500).json({ message: 'Error deleting CVs', error: err.message });
  }
};

// Get a specific PDF by user ID
const getPdf = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await Registration.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.cv) {
      return res.status(404).json({ message: 'CV not found for this user' });
    }

    const filePath = path.resolve(user.cv);
    res.sendFile(filePath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Error sending file' });
      }
    });
  } catch (error) {
    console.error('Error retrieving CV:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  uploadFile,
  getRegistration,
  deleteRegistration,
  getPdf,
  getPdfs,
  deletegPdfs
};
