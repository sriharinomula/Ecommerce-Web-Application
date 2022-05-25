var express=require('express');
var router=express.Router();

const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const register=require('./usermodel');

router.post('/register',async(req,res)=>{
    const body=req.body.data;
    console.log(body);
    const name=await register.findOne({name:body.name});
    console.log(name);
    if(name){
        return res.json({data:'user exists'})
    }
    if (!(body.name && body.password)) {
        return res.status(400).send({ error: "Data not formatted properly" });
      }
    else{
        const salt = await bcrypt.genSalt(10);
        body.password = await bcrypt.hash(body.password, salt);
        const user=register(body);
        await user.save()
       console.log('hey');
       res.json({data:'user created'})
    }
})
module.exports=router;