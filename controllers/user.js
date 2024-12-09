const User =  require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const SignUp = async (req,res) =>{
    const { name, email ,password } = req.body
    try {
        if (!name || !email || !password) {
          return res.status(400).json({
            error: 1,
            data : [],
            message: "All fields are required."
          });
        }
      
        // Server-side email format validation (including '@' symbol)
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({
            error: 1,
            data : [],
            message: "Invalid email format."
          });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({
            error : 1,
            data : [],
            message : "User already exists."
        });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        const userRegister = await User.findOne({email})

        const token = jwt.sign({ id: userRegister._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
          });
        res.status(200).json({
            error : 0,
            data : { token, userId: user._id , email : user.email , name : user.name },
            message : "User registered successfully!"
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
            error : 1,
            data : [],
            message : "Server error." 
        });
      }
}
const SignIn  = async (req,res)=>{
    const {email ,password } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({
            error : 1,
            data : [],
            message: "User not found."
        });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
              error : 1,
              data : [],
              message: "Invalid credentials."
          });   
          }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
        });

        res.status(200).json({
            error : 0,
            data : { token, userId: user._id , email : user.email , name : user.name },
            message : "User signIn successfully!"
        });
      } catch (error) {
        res.status(500).json({
            error : 1,
            data : [],
            message : "Server error." 
        });
      }
}
module.exports = {
    SignUp,
    SignIn
}