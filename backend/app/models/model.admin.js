const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
        email : {
            type : String,
            required: true,
            trim :true,
            minlength:3
        },
        password : {
            type : String,
            required: true,
            trim :true,
            minlength:3
        },
        },
    {
        versionKey : false
    }
);

module.exports = mongoose.model('Admin', AdminSchema);