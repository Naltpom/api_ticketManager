require('babel-register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ApplicationUser = require('../models/ApplicationUserModel');

const User = require('../models/UserModel');
const Application = require('../models/ApplicationModel');

exports.createApplicationUser = (req, res, next) => {
    const companyUserObject = req.body.applicationUser;

    const user = User.findOne({_id: companyUserObject.user_id})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error1: 'Utilisateur non trouvé !' });
            } 
            return user;
        })
        .catch(error => res.status(400).json({ message: "id invalide", error: error }))

    const application = Application.findOne({_id: companyUserObject.application_id})
        .then(application => {
            if (!application) {
                return res.status(401).json({ error2: 'Application non trouvé !' });
            } 
            return application
        })
        .catch(error => res.status(400).json({ error }))


    Promise.all([user, application])
        .then(data => {
            dataUser = data[0];
            dataApplication = data[1];
            if (dataUser instanceof User && dataApplication instanceof Application) {
                ApplicationUser.findOne({user_id: dataUser._id,application_id: dataApplication._id})
                    .then(app => {
                        console.log(app);
                        if (app === [] || app === null) {
                            
                            const company = new ApplicationUser({
                                user_id: dataUser._id,
                                application_id: dataApplication._id,
                                roles: companyUserObject.roles,
                                created_by: null,
                                update_by: null,
                                created_at: Date.now(),
                                update_at: Date.now(),
                            })
                
                            company.save()
                                .then((applicationUser) => res.status(201).json({ message: 'ApplicationUser crée !', applicationUser: applicationUser}))
                                .catch(error => res.status(400).json({ error }));

                        } else {
                            /**
                             * this sould edit existing one or not ?
                             * in the mean time we return error cause it exist
                             */
                            return res.status(401).json({ error2: 'ApplicationUser deja existant' });
                        }

                    })
            } else {
                return;
            }
            

        })
    .catch(error => res.status(400).json({ error }));
};

exports.modifyApplicationUser = (req, res, next) => {
    const companyUserObject = req.body.applicationUser;

    const user = User.findOne({_id: companyUserObject.user_id})
        .then(user => {
            if (!user) {
                return res.status(401).json({ error1: 'Utilisateur non trouvé !' });
            } 
            return user;
        })
        .catch(error => res.status(400).json({ message: "id invalide", error: error }))

    const application = Application.findOne({_id: companyUserObject.application_id})
        .then(application => {
            if (!application) {
                return res.status(401).json({ error2: 'Application non trouvé !' });
            } 
            return application
        })
        .catch(error => res.status(400).json({ error }))


    Promise.all([user, application])
        .then(data => {
            dataUser = data[0];
            dataApplication = data[1];
            if (dataUser instanceof User && dataApplication instanceof Application) {
                ApplicationUser.findOne({user_id: dataUser._id,application_id: dataApplication._id})
                    .then(app => {
                        if (app !== []) {
                            ApplicationUser.updateOne({}, {
                                user_id: dataUser._id,
                                application_id: dataApplication._id,
                                roles: companyUserObject.roles,
                                created_by: null,
                                update_by: null,
                                created_at: app.created_at,
                                update_at: Date.now(),
                            })
                                .then((applicationUser) => res.status(201).json({ message: 'ApplicationUser modifié !', applicationUser: applicationUser}))
                                .catch(error => res.status(400).json({ error }));
                        } else {
                            return res.status(401).json({ error2: 'ApplicationUser non trouvé !' });
                        }
                    })
                    .catch()
            }
        })
        .catch(error => res.status(400).json({ error }))
};

exports.deleteApplicationUser = (req, res, next) => {
    ApplicationUser.findOne({ _id: req.params.id })
        .then(applicationUser => {
            if (applicationUser !== null) {
                ApplicationUser.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({message : 'ApplicationUser supprimé'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                return res.status(404).json({ message: 'ApplicationUser non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneApplicationUser = (req, res, next) => {
    ApplicationUser.findOne({ _id: req.params.id })
        .then(applicationUser => res.status(200).json(applicationUser))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllApplicationUsers = (req, res, next) => {
    ApplicationUser.find()
        .then(applicationUser => res.status(200).json(applicationUser))
        .catch(error => res.status(400).json({ error }));
};
