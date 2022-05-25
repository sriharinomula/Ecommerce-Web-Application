const mongoose=require('mongoose');
let dburl='mongodb+srv://srihari:Srihari@cluster0.mdwq6.mongodb.net/db9?retryWrites=true&w=majority';
mongoose.connect(dburl);
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    role:String,
    cart:[String]
});
const user=mongoose.model('register',userSchema);
module.exports=user;