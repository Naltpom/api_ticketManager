require('babel-register');
const express = require('express');
const router = express.Router();
const companyUser = require('../controllers/CompanyUserController');

router.get('/', companyUser.getAllCompanyUsers);
router.post('/', companyUser.createCompanyUser);
router.get('/:id', companyUser.getOneCompanyUser);
router.put('/:id', companyUser.modifyCompanyUser);
router.delete('/:id', companyUser.deleteCompanyUser);


module.exports = router;