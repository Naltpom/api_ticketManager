require('babel-register');
const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/ApplicationController');

router.get('/', applicationController.getAllApplications);
router.post('/', applicationController.createApplication);
router.get('/:id', applicationController.getOneApplication);
router.put('/:id', applicationController.modifyApplication);
router.delete('/:id', applicationController.deleteApplication);


module.exports = router;