const mongoose=require('mongoose');
let dburl='mongodb+srv://srihari:Srihari@cluster0.mdwq6.mongodb.net/db9?retryWrites=true&w=majority';
mongoose.connect(dburl);
const productsSchema=new mongoose.Schema({
    id:String,
    title:String,
    description:String,
    price:String,
    category:String,
    images:[String]

});
const products=mongoose.model('products',productsSchema);
module.exports=products;