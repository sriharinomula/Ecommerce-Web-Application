var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const jwt = require('jsonwebtoken');
var feedbacks=require('./feedbackmodel');
const register=require("./usermodel");
const jwt_auth = require("../jwt");
const set_header_token = (req, res, next) => {
    res.setHeader("Authorization", 'Bearer ' + token);
    console.log("success header");
    next();
  };
  console.log('feedback');
router.post('/feedback',[set_header_token,jwt_auth],async(req,res)=>{
    const role=req.user.username.role;
    const email=req.user.username.email;
    console.log(email);
    console.log(role);
    console.log('************');
    const body=req.body;
    body.data['email']=email;
    console.log(body);
    const user = await feedbacks.findOne({email:email});
    console.log(user);
    if(!user){
        try{
            const info=await register.findOne({email:email})
            body.data['info']=info;
            console.log('######');
            console.log(body);
            const msg=feedbacks(body['data']);
            await msg.save()
            console.log(msg);
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
    router.get('/exists',[set_header_token,jwt_auth],async(req,res)=>{
        const role=req.user.username.role;
        const email=req.user.username.email;
        console.log(email);
        const user = await feedbacks.findOne({email:email});
        console.log(user);
        if(user && role!='admin'){
            res.json({data:'feedback exists'})
        }
        else if(role==='admin'){
            res.json({data:'feedback exists'})
        }
        else{
            console.log('#############');
            res.json({data:'feedback not exists'})
        }
        
    })
    module.exports=router;