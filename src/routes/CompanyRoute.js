require('babel-register');
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/CompanyController');

router.get('/', companyController.getAllCompanies);
router.post('/', companyController.createCompany);
router.get('/:id', companyController.getOneCompany);
router.put('/:id', companyController.modifyCompany);
router.delete('/:id', companyController.deleteCompany);


module.exports = router;