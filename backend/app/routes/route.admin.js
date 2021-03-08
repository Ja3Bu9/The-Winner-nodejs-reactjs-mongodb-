<<<<<<< HEAD
module.exports = app => {
    const Router = require("express").Router();
    const conntrollerAdmin = require("../controllers/admin.controller");

    Router.route("/login").post(conntrollerAdmin.loginAdmin);

    app.use("/admin", Router);
}
=======
const router = require("express").Router();
const Admin = require('../models/model.admin');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticateAdmin = require('../middleware/authenticateadmin')

// register
router.post('/register/', async(req,res)=>{
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }

        let admin = new Admin ({
            email: req.body.email,
            password: hashedPass
        })
   
    admin.save()
    .then(admin =>{
        res.json({
            message : 'admin Added Successfully!'
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
router.get('/', authenticateAdmin ,async (req,res) =>{
    try{
        const Admins = await Admin.find();
        res.json(Admins);
    }
    catch(err){
        res.json({message:err});
    }
});


//login
router.post('/login', async (req,res) => {
    var email = req.body.email
    var password = req.body.password

    Admin.findOne({email:email})
    .then(admin => {
        if(admin){
            bcrypt.compare(password, admin.password, function(err, result){
                if(err){
                    res.json({
                        error: err
                    })
                }
                if(result){
                    let token = jwt.sign({id: admin.id,admin: true}, 'azertyu', {expiresIn: '1h'})
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
                message: 'No admin Found!'
            })
        }
    })
})

module.exports = router;
>>>>>>> b830b3f4b979f7cd39b4a4df05378b30e7f3dfa7
