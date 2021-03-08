<<<<<<< HEAD
module.exports = app => {
    const Router = require("express").Router();
    const userController = require("../controllers/user.controller")
    Router.route("/login").post( userController.login);
    Router.route("/register").post(userController.register);
    app.use("/user", Router)
}
=======
const router = require("express").Router();
const User = require('../models/model.user');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticate = require('../middleware/authenticate')

// register
router.post('/register/', async(req,res)=>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }

        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            password: hashedPass
        })
   
    user.save()
    .then(user =>{
        res.json({
            message : 'User Added Successfully!'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })


    })

    
})

//Get all the Users
router.get('/', authenticate ,async (req,res) =>{
    try{
        const Users = await User.find();
        res.json(Users);
    }
    catch(err){
        res.json({message:err});
    }
});


//login
router.post('/login', async (req,res) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({email:email})
    .then(user => {
        if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'azertyu', {expiresIn: '1h'})
                    res.json({
                        message: 'Login Successful!',
                        token: token
                    })
                }else{
                    res.json({
                        message:'Password does not matched!'
                    })
                }
            })
        }else{
            res.json({
                message: 'No user Found!'
            })
        }
    })
})

module.exports = router;
>>>>>>> b830b3f4b979f7cd39b4a4df05378b30e7f3dfa7
