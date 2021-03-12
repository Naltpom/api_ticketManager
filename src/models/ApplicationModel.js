const mongoose = require('mongoose');

const Application = mongoose.model(
    'Application',
    mongoose.Schema({
        company_id: {         
            type : mongoose.Schema.Types.ObjectId,
            ref:'Company', 
            required: true
        },
        name: { type : String, required: true},
        slug: { type : String},
    })
);

module.exports =  Application;