const express = require('express');
const {userRouter}= require("./routes/user")
const {adminRouter}=require("./routes/admin")

const { courseRouter } = require("./routes/course");
const { default: mongoose } = require('mongoose');

const app = express();
app.use(express.json());
app.use("/api/v1/users",userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course",  courseRouter);


async function main(){
  await mongoose.connect("mongodb+srv://Anurag88:Anurag888@cluster0tryproject.poyvfcd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0tryproject");
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
   
}


