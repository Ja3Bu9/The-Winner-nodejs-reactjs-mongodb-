<<<<<<< HEAD
module.exports = app => {

    const Router = require("express").Router();
    const middleWareAdmin = require("../middleware/authenticateadmin")
    const categoryController = require("../controllers/category.controller")
    
    Router.route("/add").post(middleWareAdmin.admin, categoryController.add);
    Router.route("/update/:idCategory").put(middleWareAdmin.admin, categoryController.update);
    Router.route("/delete/:idCategory").delete(middleWareAdmin.admin, categoryController.delete);
    Router.route("/:idCategory").get(middleWareAdmin.admin, categoryController.getById);
    Router.route("/").get(middleWareAdmin.admin, categoryController.getAll)

    app.use("/category", Router)
}
=======
const router = require("express").Router();
const Category = require('../models/model.category');
const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.File({
            filename: 'logs/logs.log'
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
        res.status(200).json(category);
        var newDate = new Date();

        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Getting category where id :'+ req.params.idCategory)

    }
    catch(err){
        res.status(404).json({ 
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
        res.status(201).json(savedCategory)
        var newDate = new Date();

        logger.info(newDate.toLocaleDateString()+' - '+newDate.toLocaleTimeString()+' - '+'Adding Category name :'+ req.body.nomCategory)
       
    }
    catch(err){
        res.status(400).json({message: err});
     }
});



//Delete a specific post
router.delete('/delete/:idCategory', async (req,res) =>{
    try{
        const removedCategory = await Category.remove({
            _id:req.params.idCategory
        });
        res.status(200).json(removedCategory);
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
>>>>>>> b830b3f4b979f7cd39b4a4df05378b30e7f3dfa7
