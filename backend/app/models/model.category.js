const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
        nomCategory : {
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

module.exports = mongoose.model('Category', CategorySchema);