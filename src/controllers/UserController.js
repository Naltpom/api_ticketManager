require('babel-register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.createUser = (req, res, next) => {
    const userObject = JSON.parse(req.body.user);
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash,
                family_name: req.body.family_name,
                given_name: req.body.given_name,
                token: req.body.token,
                domain: req.body.domain,
                roles: req.body.roles
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User crée !'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }))
};


exports.modifyUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            User.updateOne({ _id: req.params.id }, { 
                email: req.body.email,
                password: req.body.password,
                family_name: req.body.family_name,
                given_name: req.body.given_name,
                token: req.body.token,
                domain: req.body.domain,
                roles: req.body.roles, 
                _id: req.params.id 
            })
                .then(() => res.status(200).json({message : 'User modifié'}))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.deleteUser = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            User.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({message : 'User supprimé'}))
                .catch(error => res.status(400).json({ error }));
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