const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  console.log("inside jwt");
  //console.log(res.getHeaders()["authorization"]);
 const authHeader = res.getHeaders()['authorization'];
 //console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1]
console.log(token);
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_SECRET);
    req.user = decoded;
    console.log("verified");
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};



module.exports = verifyToken