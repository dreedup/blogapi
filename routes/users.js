const express = require('express')
const router = express.Router()
const userController = require('../controllers/users')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.put('/:id', userController.auth, userController.updateUser)
router.delete('/:id', userController.auth, userController.deleteUser)
router.post('/logout/:id', userController.auth, userController.logoutUser)
router.get('/', userController.getAllUsers); // New route to get all users
router.get('/search', userController.findUser); // Route to search for users

module.exports = router;
