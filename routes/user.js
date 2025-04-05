const { Router } = require("express")
const {userModel}= require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD= " anurag123";



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
userRouter.get('/purchases', function(req,res){
    res.json({
        message:"all your courses"
    })
})
  
module.exports={
    userRouter:userRouter
}