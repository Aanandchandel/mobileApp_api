const express = require('express');
const router = express.Router();
const {createUser,getUsers,getUserById,updateUser,deleteUser} = require('../controllers/userController');

router.post('/', createUser); // Create a user
router.get('/', getUsers); // Get all users
router.get('/:id', getUserById); // Get a user by ID
router.put('/:id', updateUser); // Update a user by ID
router.delete('/:id', deleteUser); // Delete a user by ID

module.exports = router;