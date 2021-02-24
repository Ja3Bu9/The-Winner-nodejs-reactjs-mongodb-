const mongoose = require('mongoose');

const QuestionShema = mongoose.Schema({
        contentQuestion : {
            type : String,
            required: true,
            trim :true,
            minlength:3
        },
        contentResponse: {
            type : String,
            required:true,
            trim : true,
            minlength: 3
        },
        falseresponse: [
            {
                type : String,
                required:true,
                trim : true,
                minlength: 3 
            },
            {
                type : String,
                required:true,
                trim : true,
                minlength: 3 
            },
            {
                type : String,
                required:true,
                trim : true,
                minlength: 3 
            }

        ],
        idCategory:{
            type: String,
            trim: true,
        },
        },
    {
        versionKey : false
    }
);

module.exports = mongoose.model('Question', QuestionShema);
