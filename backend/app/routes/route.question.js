const router = require("express").Router();
const Question = require('../models/model.question');


//Get all the posts
router.get('/', async (req,res) =>{
    try{
        const Questions = await Question.find();
        res.json(Questions);
    }
    catch(err){
        res.json({message:err});
    }
});


//Get a specific post
router.get('/get/:idQuestion', async (req,res) =>{
    try{
        const question = await Question.findById(req.params.idQuestion);  //findOne = findById
        res.json(question);
    }
    catch(err){
        res.json({ 
            message : err
        });
    }
})


//Add a post
router.post('/add/', async (req,res) =>{
    const question = new Question({
        contentQuestion :req.body.contentQuestion,
        contentResponse : req.body.contentResponse,
        falseresponse : [
            req.body.falseresponse[0],
            req.body.falseresponse[1],
            req.body.falseresponse[2]
        ],
                idCategory:req.body.idCategory
    });

    try{
        const savedquestion = await question.save()
        res.json(savedquestion)
    }
    catch(err){
        res.json({message: err});
     }
});



//Delete a specific post
router.delete('/delete/:idQuestion', async (req,res) =>{
    try{
        const removedQuestion = await Question.remove({
            _id:req.params.idQuestion
        });
        res.json(removedQuestion);
    }
    catch(err){
        res.json({ 
            message : err
        });
    }
})



//Update a specific post -- PUT OR PATCH
router.put('/update/:idQuestion', async (req,res) =>{
    try{
        const updatedQuestion = await Question.updateOne({
            _id:req.params.idQuestion}, {$set :{
                contentQuestion :req.body.contentQuestion,
                contentResponse : req.body.contentResponse,
                falseresponse : [
                    req.body.falseresponse[0],
                    req.body.falseresponse[1],
                    req.body.falseresponse[2]
                ],
                idCategory:req.body.idCategory
            }
        });
        res.json(updatedQuestion);
    }
    catch(err){
        res.json({ 
            message : err
        });
    }
})



module.exports = router;