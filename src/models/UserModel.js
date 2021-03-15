require('babel-register');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = mongoose.model(
    'User',
    mongoose.Schema({
        email: {type: String, required: true ,unique: true },
        password: {type : String, required: true},
        family_name: {type : String, required: true},
        given_name: {type : String, required: true},
        token: {type : String, required: true},
        domain: {type : String, required: true},
        roles: {type : String, required: true},
        companies_id: [{ 
            type : mongoose.Schema.Types.ObjectId,
            ref:'Company', 
        }],
        created_by: { 
            type : mongoose.Schema.Types.ObjectId,
            ref:'User', 
        },
        update_by: { 
            type : mongoose.Schema.Types.ObjectId,
            ref:'User', 
        },
        created_at: { 
            type : Date, 
        },
        update_at: { 
            type : Date, 
        },
    }).plugin(uniqueValidator)
);
// console.log(userSchema);
// userSchema;
module.exports =  User;