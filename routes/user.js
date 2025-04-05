const { Router } = require("express")
const {userModel, purchaseModel, courseModel}= require("../db");
const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD}= require("../config");
const { userMiddleware } = require("../middleware/user");



const userRouter= Router();
userRouter.post('/signup', async function(req,res){
       const {email, password, firstname, lastname}= req.body;


      try {
        await userModel.create({
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

userRouter.post('/signin', async function(req,res){
    const {email, password}=req.body;
    const user = await userModel.findOne({
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
})
userRouter.get('/purchases', userMiddleware, async function(req,res){
    const userId= req.userId;
    const purchase=await purchaseModel.findOne({
        userId,
    });
    const coursesData= await courseModel.find({
        _id:{$in: purchase.map(x=> x.courseId)}
    })
    res.json({
        message:"all your courses"
    })
})
  
module.exports={
    userRouter:userRouter
}