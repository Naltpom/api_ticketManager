require('babel-register');
const CompanyUser = require('../models/CompanyUserModel');

const User = require('../models/UserModel');
const Company = require('../models/CompanyModel');

exports.createCompanyUser = (req, res, next) => {
    const companyUserObject = req.body.companyUser;

    const user = User.findOne({_id: companyUserObject.user_id})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error1: 'Utilisateur non trouvé !' });
            } 
            return user;
        })
        .catch(error => res.status(400).json({ message: "id invalide", error: error }))

    const company = Company.findOne({_id: companyUserObject.company_id})
        .then(company => {
            if (!company) {
                return res.status(401).json({ error2: 'Company non trouvé !' });
            } 
            return company
        })
        .catch(error => res.status(400).json({ error }))


    Promise.all([user, company])
        .then(data => {
            dataUser = data[0];
            dataCompany = data[1];
            if (dataUser instanceof User && dataCompany instanceof Company) {
                CompanyUser.findOne({user_id: dataUser._id,company_id: dataCompany._id})
                    .then(app => {
                        console.log(app);
                        if (app === [] || app === null) {
                            
                            const company = new CompanyUser({
                                user_id: dataUser._id,
                                company_id: dataCompany._id,
                                roles: companyUserObject.roles,
                                created_by: null,
                                update_by: null,
                                created_at: Date.now(),
                                update_at: Date.now(),
                            })
                
                            company.save()
                                .then((companyUser) => res.status(201).json({ message: 'CompanyUser crée !', companyUser: companyUser}))
                                .catch(error => res.status(400).json({ error }));

                        } else {
                            /**
                             * this sould edit existing one or not ?
                             * in the mean time we return error cause it exist
                             */
                            return res.status(401).json({ error2: 'CompanyUser deja existant' });
                        }

                    })
            } else {
                return;
            }
            

        })
    .catch(error => res.status(400).json({ error }));
};

exports.modifyCompanyUser = (req, res, next) => {
    const companyUserObject = req.body.companyUser;

    const user = User.findOne({_id: companyUserObject.user_id})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error1: 'Utilisateur non trouvé !' });
            } 
            return user;
        })
        .catch(error => res.status(400).json({ message: "id invalide", error: error }))

    const company = Company.findOne({_id: companyUserObject.company_id})
        .then(company => {
            if (!company) {
                return res.status(401).json({ error2: 'Company non trouvé !' });
            } 
            return company
        })
        .catch(error => res.status(400).json({ error }))


    Promise.all([user, company])
        .then(data => {
            dataUser = data[0];
            dataCompany = data[1];
            if (dataUser instanceof User && dataCompany instanceof Company) {
                CompanyUser.findOne({user_id: dataUser._id,company_id: dataCompany._id})
                    .then(app => {
                        if (app !== []) {
                            CompanyUser.updateOne({}, {
                                user_id: dataUser._id,
                                company_id: dataCompany._id,
                                roles: companyUserObject.roles,
                                created_by: null,
                                update_by: null,
                                created_at: app.created_at,
                                update_at: Date.now(),
                            })
                                .then((companyUser) => res.status(201).json({ message: 'CompanyUser modifié !', companyUser: companyUser}))
                                .catch(error => res.status(400).json({ error }));
                        } else {
                            return res.status(401).json({ error2: 'CompanyUser non trouvé !' });
                        }
                    })
                    .catch()
            }
        })
        .catch(error => res.status(400).json({ error }))
};

exports.deleteCompanyUser = (req, res, next) => {
    CompanyUser.findOne({ _id: req.params.id })
        .then(companyUser => {
            if (companyUser !== null) {
                CompanyUser.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({message : 'CompanyUser supprimé'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                return res.status(404).json({ message: 'CompanyUser non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneCompanyUser = (req, res, next) => {
    CompanyUser.findOne({ _id: req.params.id })
        .then(companyUser => res.status(200).json(companyUser))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllCompanyUsers = (req, res, next) => {
    CompanyUser.find()
        .then(companyUser => res.status(200).json(companyUser))
        .catch(error => res.status(400).json({ error }));
};
