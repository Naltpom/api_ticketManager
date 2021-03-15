require('babel-register');
const mongoose = require('mongoose');

const CompanyUser = mongoose.model(
    'CompanyUser',
    mongoose.Schema({
        company_id: {         
            type : mongoose.Schema.Types.ObjectId,
            ref:'Company', 
            required: true
        },
        user_id: {         
            type : mongoose.Schema.Types.ObjectId,
            ref:'User', 
            required: true
        },
        roles: { type : String, required: true},
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
    })
);

module.exports =  CompanyUser;