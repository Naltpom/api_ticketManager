const mongoose = require('mongoose');

const Company = mongoose.model(
    'Company',
    mongoose.Schema({
        name: { type : String, required: true},
        slug: { type : String},
        uuid: { type : String},
    })
);

module.exports =  Company;