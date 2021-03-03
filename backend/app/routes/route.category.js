const router = require("express").Router();
const Category = require('../models/model.category');
const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: '../logs/logs.log'
        })
    ]
}

const logger = winston.createLogger(logConfiguration)

//Get all the posts
router.get('/', async (req,res) =>{
    try{
        const Categorys = await Category.find();
        res.json(Categorys);
        var newDate = new Date();
        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Getting all categorys')
    }
    catch(err){
        res.json({message:err});
    }
});


//Get a specific post
router.get('/get/:idCategory', async (req,res) =>{
    try{
        const category = await Category.findById(req.params.idCategory);  //findOne = findById
        res.json(category);
        var newDate = new Date();

        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Getting category where id :'+ req.params.idCategory)

    }
    catch(err){
        res.json({ 
            message : err
        });
    }
})


//Add a post
router.post('/add/', async (req,res) =>{
    const category = new Category({
        nomCategory : req.body.nomCategory
    });

    try{
        const savedCategory = await category.save()
        res.json(savedCategory)
        var newDate = new Date();

        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Adding Category name :'+ req.body.nomCategory)
       
    }
    catch(err){
        res.json({message: err});
     }
});



//Delete a specific post
router.delete('/delete/:idCategory', async (req,res) =>{
    try{
        const removedCategory = await Category.remove({
            _id:req.params.idCategory
        });
        res.json(removedCategory);
        var newDate = new Date();

        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Deleting Category id :'+ req.params.idCategory)

    }
    catch(err){
        res.json({ 
            message : err
        });
    }
})



//Update a specific post -- PUT OR PATCH
router.put('/update/:idCategory', async (req,res) =>{
    try{
        const updatedCategory = await Category.updateOne({
            _id:req.params.idCategory}, {$set :{nomCategory :req.body.nomCategory}
        });
        res.json(updatedCategory);
        var newDate = new Date();

        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Updating Category id :'+ req.params.idCategory)

    }
    catch(err){
        res.json({ 
            message : err
        });
    }
})



module.exports = router;