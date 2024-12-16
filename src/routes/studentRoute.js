const express = require('express');
const validateRegistration=require("../middlewares/validateRegistration.js")
const router = express.Router();
const upload=require("../servicess/uplodeFile")
const {uploadFile,getRegistration,deleteRegistration,getPdf} = require('../controllers/studentController.js');
const authenticateJWT=require("../middlewares/authenticateJWT.js")

//Date.now() + path.extname(file.originalname)) fill name will be 
router.post('/', upload.single("cv"),validateRegistration,uploadFile);

// Get a registration by ID
router.get('/',authenticateJWT, getRegistration);

router.get('/:id',authenticateJWT, getPdf);

// Delete a registration by ID
router.delete('/:id',authenticateJWT, deleteRegistration);
 
module.exports = router;

   