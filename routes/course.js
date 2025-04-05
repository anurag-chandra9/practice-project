const {Router}= require('express')
const { userMiddleware}=require("../middleware/user");
const {purchaseModel, courseModel}= require("../db");


const courseRouter=Router();

 
courseRouter.post('/purchase',userMiddleware,async  function(req ,res){
     const userId= req.userId;
     const courseId= req.body.courseId;
     await purchaseModel.create({
        userId,
        courseId
     })

    res.json({
        message:"you have succesfully bought this cousres"
    })
})
courseRouter.get('/priview', async function(req,res){
    const cousres= await courseModel.findOne({});
    res.json({
        message:"All courses"
    })
})

module.exports={
    courseRouter:courseRouter
}