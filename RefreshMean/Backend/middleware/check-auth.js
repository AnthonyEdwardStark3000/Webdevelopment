const jwt = require('jsonwebtoken');

module.exports = (req, res, next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "secret_for_json_web_token_and_it_should_be_as_long_as_possible"); //passing both the token generated and the secret from the user.js from Routes
    next();
  }
  catch(error){
    res.status(401).json({ message: "Authentication Failed"})
  }
};
