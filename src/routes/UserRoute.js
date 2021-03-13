require('babel-register');
const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getOneUser);
router.put('/:id', userController.modifyUser);
router.delete('/:id', userController.deleteUser);


module.exports = router;