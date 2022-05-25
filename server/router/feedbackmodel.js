const mongoose=require('mongoose');
let dburl='mongodb+srv://srihari:Srihari@cluster0.mdwq6.mongodb.net/db9?retryWrites=true&w=majority';
mongoose.connect(dburl);
const feedbackSchema=new mongoose.Schema({
    email:String,
    review:String,
    rating:String,
    info:{
    _id:String,
    name:String,
    email:String,
    password:String,
    role:String
    }
    
});
const feedbacks=mongoose.model('feedbacks',feedbackSchema);
module.exports=feedbacks;