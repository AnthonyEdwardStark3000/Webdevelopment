//For authentication and security jwt library of express npm i express-jwt
const expressJwt = require("express-jwt");
//for checking authentications
function authJwt()
{
  const secret = process.env.secret;//getting the secret from the environmental varibale this will be used for authentications
    return expressJwt(
      {
        secret,
      // algorithms:['H256']  //visit JWT.io for checking the available algorithms
      algorithms: ['sha1', 'RS256', 'HS256'],//sending the algorithms array as the above line failed to decrypt
    }
  );
}
module.exports = authJwt;//exporting the function to be available outside .check index.js
