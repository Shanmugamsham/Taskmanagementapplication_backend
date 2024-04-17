const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createAccessToken } = require("../utils/token");


const signup=async(req,res,next)=>{
    try {
        const {name,email,password}=req.body
    
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "This email is already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedPassword });
      res.status(200).json({ msg: "Congratulations!! Account has been created for you.." });
    } catch (error) {
        console.error(err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
    
    
}

 const  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ status: false, msg: "Please enter all details!!" });
      }
  
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ status: false, msg: "This email is not registered!!" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });
           


       const token = createAccessToken({ id: user._id });
    
      res.status(200).json({ token, user, status: true, msg: "Login successful.." });
    }
    catch (err) {
      console.error(err);
      return res.status(500).json({ status: false, msg: "Internal Server Error" });
    }
  }

  module.exports={
    signup,
    login
  }