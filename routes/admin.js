const {Router}= require("express")
const adminRouter= Router();
const {adminModel, courseModel}= require("../db");
const jwt= require("jsonwebtoken");
const {adminMiddleware}= require("../middleware/admin")
const {JWT_ADMIN_PASSWORD}=require("../config");
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

adminRouter.post('/courses', async function(req,res){
    const adminId= req.userId;
    const {title,description,imageUrl,price}= req.boby;

   const course= await courseModel.create({
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId
    })
    res.json({
        message:"course created",
        courseId: course._id 
    })
})
adminRouter.put('/courses',adminMiddleware, async function(req,res){
      const adminId= req.userId;
      const {title,description,imageUrl,price,courseId}=req.body;
      const course=await courseModel.updateOne({
        _id:courseId,
        creatorId:adminId
      },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
      })
    res.json({
        message:"all your courses"
    })
})

adminRouter.get('/courses/bulk',adminMiddleware,async  function(req,res){
   const adminId=req.userId;
   const {title,description, imageUrl, price, courseId}= req.body;
   const course = await courseModel.find({
    _id:courseId,
    creatorId:adminId
   },{
    title:title,
    description:description,
    imageUrl:imageUrl,
    price:price
   });
    
   
  
    res.json({
        message:"all your courses",
        courseId:course._id
    })
})
module.exports={
    adminRouter:adminRouter
}