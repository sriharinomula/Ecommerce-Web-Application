var express=require('express');
var http=require('http');
var app=express();
const cors=require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
// access config var
process.env.TOKEN_SECRET;
const jwt_auth = require("./jwt");

const set_header_token = (req, res, next) => {
  res.setHeader("Authorization", 'Bearer ' + token);
  console.log("success header");
  next();
};
/*global.token;
function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}*/
var login=require('./router/login');
var register=require('./router/register');
var products=require('./router/products');
var profile=require('./router/profile');
var feedback=require('./router/feedback');
var admin=require('./router/admin');
app.use(cors());
app.use(express.json());
app.use('/newuser',register);
app.use('/user',login);
app.use('/products',products);
app.use('/profile',profile);
app.use('/customers',feedback);
app.use('/admin',admin);
app.get('/hi',(req,res)=>{
    console.log('hi');
    res.send('hi')
})

app.listen(5000,()=>{console.log('listening');})