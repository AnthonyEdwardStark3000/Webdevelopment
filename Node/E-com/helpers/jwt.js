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
      isRevoked: isRevoked //even the user will be able to make changes to the site , inorder to remove admin privilages we use isRevoked async function
    }
  ).unless({
    path:[
      { url:/\/public\/uploads(.*)/, methods:['GET','OPTIONS']}, //to get product lists before authentication.antthing after products/ in api is now accessible
      { url:'/products(.*)/', methods:['GET','OPTIONS']}, //to get product lists before authentication.antthing after products/ in api is now accessible
      { url:'/categories(.*)/', methods:['GET','OPTIONS']}, //to get categories lists before authentication.antthing after categories/ in api is now accessible
      '/users/login',
      '/users/register' //excludei.e to make these api s available eventhough user is not authenticated
    ]
  });
}

async function isRevoked(req, payload ,done){
  //req -> for request
  //payload -> contain data inside Token
  //done
  if(!payload.isAdmin)
  {
    done(null, true) // rejecting the token of user .
  }
  done();// if its an admin then token is provided with privilages
}


module.exports = authJwt;//exporting the function to be available outside .check index.js
