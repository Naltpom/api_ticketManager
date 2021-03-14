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
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            } 
            return user;
        })
        .catch(err => res.status(400).json({ message: "id invalide", error: err }))

    const application = Application.findOne({_id: companyUserObject.application_id})
        .then(application => {
            if (!application) {
                return res.status(401).json({ error: 'Application non trouvé !' });
            } 
            return application
        })
        .catch(err => res.status(400).json({ err }))


    Promise.all([user, application])
        .then(data => {
            console.log(data)
            dataUser = data[0];
            dataApplication = data[1];
            if (dataUser instanceof ServerResponse || dataApplication instanceof ServerResponse) {
                console.log('totototoototototototototoototototo');;
            }
            
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
        })
    .catch(error => res.status(400).json({ error }));
};
