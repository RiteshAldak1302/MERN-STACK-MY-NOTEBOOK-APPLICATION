const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SCREAT = "ritesh#$%";

//Route 1: post request for creating a data for new user
router.post(
  "/api/auth/createuser",
  [
    //this all code is copied from express-validator website
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // when we not use express-validator then we have to use below commented code to save the user data in db
    // const user = User(req.body)
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      //if user is already exist
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry , user with this email id is already exist" });
      }
      const salt = await bcrypt.genSaltSync(10); // we use await becoz it return promises
      const secPassword = await bcrypt.hash(req.body.password, salt);
      // create user by using express-validator but if we are not using express-validation then we have to save the user by save method
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
      });
      //data is an object , this is the data used in jwt.sign
      const data = {
        user: {
          id: user.id
        }
      };
      //here we use jwtwebtoken to verify user , we should not send the user data to user but we giving token to9 verify the user
      const authToken = jwt.sign(data, JWT_SCREAT);
      res.json({ authToken }); //here we ES6 ,we can also use {authToken:authToken} when key and value is same then we can write only once
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
    //below commented code is by promises but here we use async await
    //   .then(user => res.json(user)).catch(err=>{
    //     res.json({error:'please enter the unique value for an Email',message: err.message})
    // })
  }
);

//Route 2: for login authentication (verifying the user email id and password is correct or not )

router.post("/api/auth/login",
  [
    //this all code is copied from express-validator website
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),  //by the exists method , password can not be blank
  ],
  async (req, res) => {
   
    //if there are errors,return bad request and errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //here we use destructuring 

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "please try to login with correct details" })
      }
       //compare the password for login the existing user
      //we compare the password which is writing by user for login and the password which is save for this user (when user register the detail) in Data BASE
      //we compare the password with the help of bycrpt
      //it give true(if password match) and false (if password does not match)
      //password is written by user in the login time and user.password is password of this user is stored in DATA BASE

      const passwordCompare = await bcrypt.compare(password,user.password);
     if(!passwordCompare){
           return res.status(400).json({error: "please try to login with correct credentials"})
          }
        // const  JWT_SCREAT ="ritesh@132565"
          const data = {
            user:{
              id:user.id
            }
          }
          const authToken = jwt.sign(data, JWT_SCREAT);
      res.json({ authToken });
          }
    
    catch (error) {
      console.error(error.message);
      res.status(500).send("some internal server error occured");
    }
  })

  //Route 3: Get logged in user details (this is not verfiaction of email and password ) 
  

    module.exports = router
