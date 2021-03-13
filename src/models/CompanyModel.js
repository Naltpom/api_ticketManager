require('babel-register');
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Company = mongoose.model(
    'Company',
    mongoose.Schema({
        name: { type : String, required: true},
        slug: { type : String, unique: true},
    }).plugin(uniqueValidator)
);

module.exports =  Company;
// npm install mongoose-url-slugs