const jwt = require("jsonwebtoken");

const config = require('./config');


const createSecretToken=(id)=> {
  return jwt.sign({ id }, config.secret, {
    expiresIn: 3* 24 * 60 * 60,
  });
}
module.exports=createSecretToken 
