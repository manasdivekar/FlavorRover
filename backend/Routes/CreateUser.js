const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");


const bycrypt = require('bcryptjs');

const jwt = require( "jsonwebtoken");

//secret key

const jwtSecretKey = "fXiErnFcKaKnX2qxxlt9ZmzJfXiErnFc";

router.post(
  "/createUser",
  [
    body("email", "Invalid Email").isEmail(),
    body("name").isLength({ min: 3 }),
    body("password", "Incorrect Password length").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const {name,email,password} = await req.body;
    console.log("name in backend:",name)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

//brcpyting the password 
const salt = await bycrypt.genSalt(10);
 var secPassword = await bycrypt.hash(req.body.password,salt);

    try {
      const user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });

      console.log("user added:",user);
      return res.json({success: "true"})
      // .then(res.json({ success: true }));
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

//login user

router.post(
  "/loginUser",
  [
    body("email", "Invalid Email").isEmail(),
    body("password", "Incorrect Password length").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    let userpassword = req.body.password;
    try {
      let userData = await User.findOne({ email });
      if (!userData) {
        return res.status(400).json({ errors: "Email Id Not Matched" });
      }

      const pwdComp = await bycrypt.compare(userpassword,userData.password);


      if (!pwdComp) {
        return res.status(400).json({ errors: "Password Not Matched" });
      }

      const data ={
        user:{
            id:userData.id
        }
      }

      const authToken = jwt.sign(data,jwtSecretKey)

      return res.json({ success: true , authToken:authToken});
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  }
);

module.exports = router;
