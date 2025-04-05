const {Router}= require("express")
const adminRouter= Router();
const {adminModel}= require("../db");
const jwt= require("jsonwebtoken");
const JWT_ADMIN_PASSWORD="Anurag11"; 
adminRouter.post('/signup',async function(req,res){
    const {email, password, firstname, lastname}= req.body;
    try {
        await adminModel.create({
          email:email,
          password:password,
          firstname:firstname,
          lastname:lastname
          
         })
      } catch (error) {
        res.json({
            message:"sigup failed"
        })
        
      }

    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post('/signin', async function(req,res){
     const {email, password}=req.body;
        const admin = await adminModel.findOne({
            email:email,
            password:password
        });
        if(user){
            const token=jwt.sign({
                id:user._id
            }, JWT_USER_PASSWORD);
            res.json({
                token:token
            })
        }else{
            res.status(403).json({
                message:"incorrect credentials"
            })
        }
        res.json({
            message:"signin endpoint"
        })
    res.json({
        message:"signin endpoint"
    })
})
adminRouter.put('/courses', function(req,res){
    res.json({
        message:"all your courses"
    })
})
adminRouter.post('/courses', function(req,res){
    res.json({
        message:"all your courses"
    })
})
adminRouter.get('/courses', function(req,res){
    res.json({
        message:"all your courses"
    })
})
adminRouter.get('/courses/bulk', function(req,res){
    res.json({
        message:"all your courses"
    })
})
module.exports={
    adminRouter:adminRouter
}