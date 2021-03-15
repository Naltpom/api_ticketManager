require('babel-register');
const express = require('express');
const router = express.Router();
const applicationUser = require('../controllers/ApplicationUserController');

router.get('/', applicationUser.getAllApplicationUsers);
router.post('/', applicationUser.createApplicationUser);
router.get('/:id', applicationUser.getOneApplicationUser);
router.put('/:id', applicationUser.modifyApplicationUser);
router.delete('/:id', applicationUser.deleteApplicationUser);


module.exports = router;