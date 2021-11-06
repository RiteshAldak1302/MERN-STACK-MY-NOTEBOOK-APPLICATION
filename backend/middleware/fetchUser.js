// this is the middleware and middleware is function that access req , res and next function (this is the function which is present in roter express method) 
// and we calling middleware by passing 2nd parameter in router express method.
const jwt = require("jsonwebtoken");
const JWT_SCREAT = "ritesh#$%"; 
// fetchUser function is middleware
const fetchUser = (req , res , next ) =>{
    const token = req.header('authtoken');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try { 
        const data = jwt.verify(token, JWT_SCREAT);
        req.user = data.user ;
        next(); 
        
    }catch (error){
        res.status(401).send({error: "Please authenticate using a valid token"})
      }
}

module.exports = fetchUser ;