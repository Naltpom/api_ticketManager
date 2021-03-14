require('babel-register');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Company = mongoose.model(
    'Company',
    mongoose.Schema({
        name: { type : String, required: true},
        slug: { type : String, unique: true},
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

module.exports =  Company;
// npm install mongoose-url-slugs