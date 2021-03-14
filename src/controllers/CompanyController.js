require('babel-register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Company = require('../models/CompanyModel');

exports.createCompany = (req, res, next) => {
    const companyObject = req.body.company;
    const company = new Company({
        name: companyObject.name,
        slug: companyObject.slug,
        created_by: null,
        update_by: null,
        created_at: Date.now(),
        update_at: Date.now(),
    });
    company.save()
        .then((company) => res.status(201).json({ message: 'Company crée !', company: company}))
        .catch(error => res.status(400).json({ error }));
};


exports.modifyCompany = (req, res, next) => {
    Company.findOne({ _id: req.params.id })
        .then(company => {
            const companyObject = req.body.company;

            Company.updateOne({ _id: req.params.id }, { 
                name: companyObject.name,
                slug: companyObject.slug,
                created_by: null,
                update_by: null,
                created_at: user.created_at,
                update_at: Date.now(),
            })
                .then((company) => res.status(200).json({message : 'Company modifié', company: company}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteCompany = (req, res, next) => {
    Company.findOne({ _id: req.params.id })
        .then(company => {
            if (company !== null) {
                Company.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({message : 'Company supprimé'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                return res.status(404).json({ message: 'Company non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ message: 'company not found :' + error }));
};

exports.getOneCompany = (req, res, next) => {
    Company.findOne({ _id: req.params.id })
        .then(company => res.status(200).json(company))
        .catch(error => res.status(404).json({ message: 'company not found :' + error }));
};

exports.getAllCompanies = (req, res, next) => {
    Company.find()
        .then(companys => res.status(200).json(companys))
        .catch(error => res.status(400).json({ error }));
};