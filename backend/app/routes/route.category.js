const router = require("express").Router();
const Category = require('../models/model.category');


//Get all the posts
router.get('/', async (req,res) =>{
    try{
        const Categorys = await Category.find();
        res.json(Categorys);
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
    }
    catch(err){
        res.json({ 
            message : err
        });
    }
})



module.exports = router;