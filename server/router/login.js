var express=require('express');
var router=express.Router();
const mongoose=require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
let dburl='mongodb+srv://srihari:Srihari@cluster0.mdwq6.mongodb.net/db9?retryWrites=true&w=majority';
mongoose.connect(dburl);
const register=require("./usermodel");
global.token;
function generateAccessToken(username,role,email) {
  return jwt.sign({username,role,email}, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}
router.post('/login',async(req,res)=>{
    const body = req.body.data;
    console.log(body);
    const user = await register.findOne({ name: body.name });
    console.log(user.role);
    console.log(body.role);
    if (user && user.role===body.role) {
      // check user password with hashed password stored in the database
      const validPass = await bcrypt.compare(body.password, user.password);
      if (validPass) {
        console.log(user);
        token = generateAccessToken({ name: req.body.name,role:user.role,email:user.email });
        console.log(token);
        res.setHeader("Authorization", 'Bearer ' + token)
        res.status(200).json({ message: "Valid password",token:token });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      res.json({ message: "User does not exist or incorrect details" });
    }
})


module.exports=router;