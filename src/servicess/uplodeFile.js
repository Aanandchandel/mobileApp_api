const { models } = require('mongoose');
const multer = require('multer');
const path = require('path');

// Set up storage engine for multer (for saving files to the server)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // You can change this to any folder where you want to store the resumes
      cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
      // Set the filename to the original file name (you can modify this to add timestamps for uniqueness)
      cb(null,  Date.now() + path.extname(file.originalname));
    }
  });
  
  // Initialize multer with the storage configuration
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max size: 5MB (adjust as needed)
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type. Only JPEG, PNG, and GIF images are allowed.'));
      }
      cb(null, true);
    }
  });
  
  
  module.exports=upload;


  