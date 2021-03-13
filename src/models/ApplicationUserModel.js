require('babel-register');
const mongoose = require('mongoose');

const ApplicationUser = mongoose.model(
    'ApplicationUser',
    mongoose.Schema({
        application_id: {         
            type : mongoose.Schema.Types.ObjectId,
            ref:'Application', 
            required: true
        },
        user_id: {         
            type : mongoose.Schema.Types.ObjectId,
            ref:'User', 
            required: true
        },
        roles: { type : String, required: true},
    })
);

module.exports =  ApplicationUser;