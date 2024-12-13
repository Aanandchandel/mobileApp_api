const Registration =require("../models/studentInfo")
const uploadFile=async(req,res)=>{
    try{
        if (!req.file) {
            return res.status(400).send('No file uploaded');
          }
          const registrationData = new Registration({
            ...req.body,
            cv: req.file.path // Store the path of the uploaded file in the database
          });
      
          // Save the data to the database
          await registrationData.save();
      // console.log("hiii","...........",registrationData)
         return  res.status(201).json({
            message: 'Registration successful',
            data: registrationData
          });
    }   
    catch(err){
        console.log("falling in catch")
        return res.status(500).json({message:err})

    }
}


// Controller to get a registration by ID
const getRegistration = async (req, res) => {
  try {
    // Find the registration by ID
    const registration = await Registration.find();
    
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    // Return the registration data if found
    res.status(200).json({ success: true, registration });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



// Controller to delete a registration by ID
const path = require('path');
const fs = require('fs/promises'); // Use promises for async file handling

const deleteRegistration = async (req, res) => {
  const { id } = req.params; // Get the ID from the request parameters

  try {
    // Find the registration by ID
    const registration = await Registration.findById(id);
    if (!registration) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }

    const cv = registration.cv; // Get the file path for the CV
    const filePath = path.join( cv);

    let cvDeleted = false;
    let userDeleted = false;

    try {
      // Delete the CV file
      await fs.unlink(filePath);
      cvDeleted = true;
    } catch (fileError) {
      if (fileError.code !== 'ENOENT') {
        // Log unexpected file errors
        console.error('Error deleting CV file:', fileError);
        return res.status(500).json({ success: false, message: 'Error deleting CV file' });
      }
    }

    try {
      // Delete the registration from the database
      await Registration.findByIdAndDelete(id);
      userDeleted = true;
    } catch (dbError) {
      console.error('Error deleting user:', dbError);
      return res.status(500).json({ success: false, message: 'Error deleting user from database' });
    }

    // Return the appropriate response based on what was deleted
    if (cvDeleted && userDeleted) {
      return res.status(200).json({ success: true, message: 'User and CV deleted successfully' });
    } else if (cvDeleted) {
      return res.status(200).json({ success: true, message: 'CV deleted, but user deletion failed' });
    } else if (userDeleted) {
      return res.status(200).json({ success: true, message: 'User deleted, but CV deletion failed' });
    } else {
      return res.status(500).json({ success: false, message: 'Deletion failed' });
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



module.exports={uploadFile,getRegistration,deleteRegistration}