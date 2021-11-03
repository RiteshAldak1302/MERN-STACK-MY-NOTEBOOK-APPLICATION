const express = require("express")
const router =  express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

//post request for creating a data for new user
router.post("/api/auth/createuser",[
  //this all code is copied from express-validator website
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
body('password', 'Password must be atleast 5 character').isLength({ min: 5 })
], async(req,res)=>{
    // when we not use express-validator then we have to use below commented code to save the user data in db
    // const user = User(req.body)
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
    try{
    //if user is already exist 
    let user = await User.findOne({email : req.body.email})
    if(user){
      return res.status(400).json({error: 'sorry , user with this email id is already exist'})
    }
    const salt = await bcrypt.genSaltSync(10); // we use await becoz it return promises
    const secPassword = await bcrypt.hash(req.body.password, salt);
    
    // create user by using express-validator but if we are not using express-validation then we have to save the user by save method
   user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword
      })
      res.json(user)
    }
    catch(error){
       console.error(error.message);
       res.status(500).send("some error occured")
    }
      //below commented code is by promises but here we use async await 
    //   .then(user => res.json(user)).catch(err=>{
    //     res.json({error:'please enter the unique value for an Email',message: err.message})
    // })  
})

module.exports = router;  