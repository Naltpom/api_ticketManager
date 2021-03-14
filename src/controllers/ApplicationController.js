require('babel-register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Application = require('../models/ApplicationModel');
const Company = require('../models/CompanyModel');

exports.createApplication = (req, res, next) => {
    const applicationObject = req.body.application;
    Company.findOne({ _id: applicationObject.company_id })
        .then(company => {
            
            const application = new Application({
                company_id: company._id,
                name: applicationObject.name,
                created_by: null,
                update_by: null,
                created_at: Date.now(),
                update_at: Date.now(),
            });
            
            application.save()
                .then((application) => res.status(201).json({ message: 'Application crée !', application: application}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => {res.status(404).json({ message: 'company not found for application :' + error })})
};


exports.modifyApplication = (req, res, next) => {
    Application.findOne({ _id: req.params.id })
        .then(application => {
            
            const applicationObject = req.body.application;
            if (applicationObject.company_id !== application.company_id) {

                Company.findOne({ _id: applicationObject.company_id })
                    .then(company => {
                        console.log(company);
                        if (company !== null) {
                                Application.updateOne({ _id: req.params.id }, { 
                                company_id: company._id,
                                name: applicationObject.name,
                                created_by: null,
                                update_by: null,
                                created_at: company.created_at,
                                update_at: Date.now(),
                            })
                                .then((application) => res.status(200).json({message : 'Application modifié', application: application}))
                                .catch(error => res.status(400).json({ error }));
                        } else {
                            return res.status(404).json({ message: 'Company not found for update application' })
                        }

                    })
                    .catch(error => res.status(404).json({ message: 'Company not found for update application : ' + error }))

            } else {
                Application.updateOne({ _id: req.params.id }, { 
                    company_id: application.company_id,
                    name: applicationObject.name,
                    created_by: null,
                    update_by: null,
                    created_at: company.created_at,
                    update_at: Date.now(),
                })
                    .then((application) => res.status(200).json({message : 'Application modifié', application: application}))
                    .catch(error => res.status(400).json({ error }))
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteApplication = (req, res, next) => {
    Application.findOne({ _id: req.params.id })
        .then(application => {
            if (application !== null) {
                Application.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({message : 'Application supprimé'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                return res.status(404).json({ message: 'Application non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneApplication = (req, res, next) => {
    Application.findOne({ _id: req.params.id })
        .then(application => res.status(200).json(application))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllApplications = (req, res, next) => {
    Application.find()
        .then(applications => res.status(200).json(applications))
        .catch(error => res.status(400).json({ error }));
};

