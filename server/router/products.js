var express=require('express');
var router=express.Router();
var products=require('./productsmodel');
const register=require("./usermodel");
console.log('hi');
const jwt_auth = require("../jwt");

const set_header_token = (req, res, next) => {
  res.setHeader("Authorization", 'Bearer ' + token);
  console.log("success header");
  next();
};
router.get('/random',async(req,res)=>{
    const item=await products.find({});
    res.json({data:item});
})
router.get('/:feature/:id',async(req,res)=>{
    const feature=req.params['feature'];
    console.log(feature);
    const id=req.params['id'];
    console.log(id);
    const item = await products.findOne({$and: [{ category: feature}, { title: id }]});
    if(item){
        return res.send(item);
    }
    else{
        return res.json({data:'No results found'})
    }
})
router.get('/role',[set_header_token,jwt_auth],(req,res)=>{
    const role=req.user.username.role;
    res.json({role:role});
})
router.put('/cart',[set_header_token,jwt_auth],async(req,res)=>{
    const role=req.user.username.role;
    const email=req.user.username.email;
    const cart=req.body.title;
    const user=await register.findOne({ email: email });
    user.cart.push(cart)
    console.log('******');
    console.log(user.cart);
    if(role==='user'){
     const upd=await register.findOneAndUpdate({email:email},{cart:user.cart});
     console.log(user.cart);
     console.log(upd);
     res.json({data:"sucessfully added to cart"})
    }
    else{
        res.json({data:"only users can add to cart "})
    }
})

router.post('/item/new',[set_header_token,jwt_auth],async(req,res)=>{
    const body=req.body.data;
    console.log(body);
    const role=req.user.username.role;
    console.log(role);
    console.log('******');
    if(role==='admin'){
    try{
    const item=products(body);
    await item.save()
    console.log(item);
    res.json({data:'item added sucessfully'})
        }
        catch(err){
            console.log(err);
            res.json({data:err});
        }
    }
    else{
        res.json({data:'not authorized'});
    }
})
router.delete('/item/:id',[set_header_token,jwt_auth],async(req,res)=>{
    const role=req.user.username.role;
    console.log(role);
    console.log('delete');
    const id=req.params.id;
    console.log(id);
    if(role==="admin"){
    try{
    const item= await products.findOneAndDelete({title:id } );
    res.json({data:'sucessful'});
    console.log('sucessful');
    }
    catch(err){
    res.json({data:err});
    console.log(err);
    }
}
else{
    res.json({data:'not authorized'});
}
    
})
router.put('/item/:feature/:value',[set_header_token,jwt_auth],async(req,res)=>{
    const body=req.body;
    const role=req.user.username.role;
    const feature=req.params.feature;
    const value=req.params.value
    console.log(feature);
    console.log(body.feature);
    if(role==='admin'){
    try{
    const item=products.findOneAndUpdate({title:body.title },{});
    res.json({data:'sucessful'});
    }
    catch(err){
        res.json({data:err});
    }
}
else{
    res.json({data:'not authorized'});
}
    console.log(item);
})
module.exports=router;
