var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const register=require('./usermodel');
const jwt = require('jsonwebtoken');
const jwt_auth = require("../jwt");
let dburl='mongodb+srv://srihari:Srihari@cluster0.mdwq6.mongodb.net/db9?retryWrites=true&w=majority';
mongoose.connect(dburl);
const set_header_token = (req, res, next) => {
    res.setHeader("Authorization", 'Bearer ' + token);
    console.log("success header");
    next();
  };
  console.log('hello');
  router.get('/user',[set_header_token,jwt_auth],async(req,res)=>{
    console.log('hi');
    const role=req.user.username.role;
    const email=req.user.username.email;
    const user = await register.findOne({ email: email });
    if(user){
    try{
      res.json({data:user});
      console.log(user);
    }
    catch(err){
    res.json({data:err});
    console.log(err);
    }
  }
  else{
    console.log(role);
    res.json({data:"No user found"});
  }
})
module.exports=router;