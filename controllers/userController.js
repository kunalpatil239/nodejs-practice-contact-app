const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc register a user
// @route GET /api/users/register
// @access public

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandtory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User Already registered");
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed passawod", hashedPassword);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });
  console.log("user", user);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data is not valid");
  }
});

// @desc login user
// @route GET /api/users/login
// @access public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const user = await User.findOne({email});
  console.log(user)
  //compare password with hashedpassword
  const comparePassword = await bcrypt.compare(password,user.password)
  if(user && comparePassword ){
    const accessToken = jwt.sign({
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        }
    },process.env.ACCESS_TOKEN,{
        expiresIn: "15m"
    })
    res.status(200).json({accessToken});
  } else {
    res.status(401)
    throw new Error("email or password is not valid")
  }
  
});

// @desc current user info
// @route GET /api/users/current
// @access private

const currentUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = { registerUser, currentUser, loginUser };
