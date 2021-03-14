require('babel-register');
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

module.exports =  Application;