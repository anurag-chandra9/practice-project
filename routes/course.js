const {Router}= require('express')

const courseRouter=Router();

 
courseRouter.post('/purchase', function(req ,res){
    res.json({
        message:"All your courses"
    })
})
courseRouter.get('/priview', function(req,res){
    res.json({
        message:"All courses"
    })
})

module.exports={
    courseRouter:courseRouter
}