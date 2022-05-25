var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
var feedbacks=require('./feedbackmodel');
const jwt = require('jsonwebtoken');
let dburl='mongodb+srv://srihari:Srihari@cluster0.mdwq6.mongodb.net/db9?retryWrites=true&w=majority';
mongoose.connect(dburl);
const jwt_auth = require("../jwt");
const set_header_token = (req, res, next) => {
    res.setHeader("Authorization", 'Bearer ' + token);
    console.log("success header");
    next();
  };
  router.get('/results',[set_header_token,jwt_auth],async(req,res)=>{
    const role=req.user.username.role;
    if(role==='admin'){
        const user = await feedbacks.find({});
        console.log(user);
        res.json({data:user});
    }
  })
  router.get('/sort',[set_header_token,jwt_auth],async(req,res)=>{
    const role=req.user.username.role;
    if(role==='admin'){
      const user = await feedbacks.find({}).sort({rating:-1});
      console.log(user);
      res.json({data:user});
    }
  })
  router.get('/filter',[set_header_token,jwt_auth],async(req,res)=>{
    const role=req.user.username.role;
    if(role==='admin'){
      const user = await feedbacks.find({"rating":{$gte:3}});
      console.log('*****');
      console.log(user);
      res.json({data:user});
    }
  })
  router.post('/search',[set_header_token,jwt_auth],async(req,res)=>{
    const role=req.user.username.role;
    const body=req.body.search;
    console.log(body);
    
    if(role==='admin'){
      const user = await feedbacks.find({"info.name":body});
      console.log('*****');
      console.log(user);
      res.json({data:user});
    }
  })
  module.exports=router;
