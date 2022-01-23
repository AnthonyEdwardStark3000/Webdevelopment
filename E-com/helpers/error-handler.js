//The authJwt will return error if an unautherized token is entered and will return an stinky message and to make it an meaningful findOne
//the function is written
function errorHandler(err,req,res,next)
{
  if(err.name ==="UnauthorizedError")
  {
    return res.status(401);
    // res.send("Error in the server");
    return res.send("User is not autherized"); //sending the paticular error
  }
  if(err.name ==="ValidationError")
  {
    return res.status(401);
    // res.send("Error in the server");
    return res.send(err); //sending the paticular error
  }
  return res.status(500);
  return res.send(err);
}// method to display the error meaningful one  //alter the token using insomnia to check it.

module.exports = errorHandler;
