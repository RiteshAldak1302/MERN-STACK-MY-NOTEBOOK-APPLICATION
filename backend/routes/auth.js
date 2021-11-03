const express = require("express")
const router =  express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

router.post("/api/auth/createuser",[
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('email','Enter a valid email').isEmail(),
body('password', 'Password must be atleast 5 character').isLength({ min: 5 })
], (req,res)=>{
    
    // const user = User(req.body)
    // user.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
    
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      }).then(user => res.json(user)).catch(err=>{
          res.json({error:'please enter the unique value for an Email',message: err.message})
      })  

})

module.exports = router;  