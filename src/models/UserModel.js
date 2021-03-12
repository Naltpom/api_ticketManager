const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const User = mongoose.model(
    'User',
    mongoose.Schema({
        email: {type: String, required: true/* , unique: true */ },
        password: {type : String, required: true},
        family_name: {type : String, required: true},
        given_name: {type : String, required: true},
        token: {type : String, required: true},
        domain: {type : String, required: true},
        roles: {type : String, required: true}
        // created_by: { 
        //     type : mongoose.Schema.Types.ObjectId,
        //     ref:'User', 
        //     required: true
        // },
        // update_by: { 
        //     type : mongoose.Schema.Types.ObjectId,
        //     ref:'User', 
        //     required: true
        // },
        // created_at: { 
        //     type : Date, 
        //     required: true
        // },
        // update_at: { 
        //     type : Date, 
        //     required: true
        // },
    })
);
// console.log(userSchema);
// userSchema.plugin(uniqueValidator);
module.exports =  User;