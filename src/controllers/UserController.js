require('babel-register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.createUser = (req, res, next) => {
    const userObject = req.body.user;
    bcrypt.hash(userObject.password, 10)
        .then(hash => {
            const user = new User({
                email: userObject.email,
                password: hash,
                family_name: userObject.family_name,
                given_name: userObject.given_name,
                token: userObject.token,
                domain: userObject.domain,
                roles: userObject.roles,
                created_by: null,
                update_by: null,
                created_at: Date.now(),
                update_at: Date.now(),
            });
            user.save()
                .then((user) => res.status(201).json({ message: 'User crée !', user: user}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};


exports.modifyUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            const userObject = req.body.user;
            bcrypt.compare(userObject.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        console.log('not valid');
                        var newPasssword = bcrypt.hash(userObject.password, 10).then(password => {
                            User.updateOne({ _id: req.params.id }, { 
                                email: userObject.email,
                                password: password,
                                family_name: userObject.family_name,
                                given_name: userObject.given_name,
                                token: userObject.token,
                                domain: userObject.domain,
                                roles: userObject.roles,
                                created_by: null,
                                update_by: null,
                                created_at: user.created_at,
                                update_at: Date.now(),
                            })
                                .then((user) => res.status(200).json({message : 'User modifié', user: user}))
                                .catch(error => res.status(400).json({ error }));
                        }).catch(error => res.status(500).json({ error }))
                        console.log(newPasssword);
                    } else {
                        User.updateOne({ _id: req.params.id }, { 
                            email: userObject.email,
                            password: userObject.password,
                            family_name: userObject.family_name,
                            given_name: userObject.given_name,
                            token: userObject.token,
                            domain: userObject.domain,
                            roles: userObject.roles,
                            created_by: null,
                            update_by: null,
                            created_at: user.created_at,
                            update_at: Date.now(),
                        })
                            .then((user) => res.status(200).json({message : 'User modifié', user: user}))
                            .catch(error => res.status(400).json({ error }));
                    }
                })
                .catch()


        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            console.log(user);
            if (user !== null) {
                User.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({message : 'User supprimé'}))
                    .catch(error => res.status(400).json({ error }));
            } else {
                return res.status(400).json({ message: 'user non trouvé' })
            }
        })
        .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
    User.find()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json({ error }));
};