const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc    Register new user
//@route    POST /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, securityQuestions, genrePreferences } = req.body;
  if (!name || !email || !password || !securityQuestions || securityQuestions.length === 0) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  for (let index = 0; index < securityQuestions.length; index++) {
    const element = securityQuestions[index];

    if (element.question === "") {res.status(400); throw new Error("Invalid secuirty questions");}
    if (element.answer === "") {res.status(400); throw new Error("Invalid secuirty questions");}
  }
  
  //Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  for (let index = 0; index < securityQuestions.length; index++) {
    const element = securityQuestions[index];
    element.answer = await bcrypt.hash(element.answer, salt);
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    genrePreferences,
    securityQuestions
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Authenticate a user
//@route    POST /api/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      genrePreferences: user.genrePreferences,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Set a user's genre preferences
//@route    POST /api/setGenrePreferences
//@access   Private
const setGenrePreferences = asyncHandler(async (req, res) => {
  const { email, _id } = req.user;

  //check for user email
  const user = await User.findOne({ email });

  if(user){
    const updateGenrePreferences = await User.findByIdAndUpdate(_id, {watched : movie.watched, wantToWatch : movie.wantToWatch} , {new : true})

  }
  else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Get user security questions
//@route    POST /api/userQuestions
//@access   Public
const getSecurityQuestions = asyncHandler(async (req, res) => {
  const { email } = req.body;
  //check for user email
  const user = await User.findOne({ email }).select('-password');

  if(user){
    let questions = [];
    if(user?.securityQuestions.length > 0){
      for (let index = 0; index < user.securityQuestions.length; index++) {
        const element = user.securityQuestions[index];
        questions.push(element.question);
      }
    }
    res.status(200).json(questions); 
    return;
  }
  res.status(200).json([]);
});

// @desc    Get user security questions
//@route    POST /api/userQuestions
//@access   Public
const compareSecurityAnswers = asyncHandler(async (req, res) => {
  const { email, response } = req.body;
  //check for user email
  const user = await User.findOne({ email }).select('-password');
  if(user){
    let count = 0;
    if(user?.securityQuestions.length > 0){
      const salt = await bcrypt.genSalt(10);

      for (let index = 0; index < response.length; index++) {
        const r = response[index];

        for (let index = 0; index < user?.securityQuestions.length; index++) {
          const d = user?.securityQuestions[index];
          if(r.question === d.question){
            let result = await bcrypt.compare(r.answer, d.answer)
            result ? count++ : null;
            break;
          }
        }
      }
      if(count === user?.securityQuestions.length){
        // create new temp password
        const getUser = await User.findOne({ email });
        const symbols = ["@", "$", "!", "%", "*", "?", "&"];
        const random = Math.floor(Math.random() * symbols.length);
        let randomPassword = (Math.random().toString(36).slice(2, 12))
        randomPassword = 'R'+randomPassword.charAt(0).toUpperCase() + randomPassword.slice(1) + symbols[random];

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(randomPassword, salt);

        const updateUserPassword = await User.findByIdAndUpdate(getUser._id, {password : hashedPassword});
        if (updateUserPassword) {
          res.status(200).json({status: 'OK', temp: randomPassword}); 
          return;
        } else {
          res.status(400);
          throw new Error("Something went wrong.");
        }
      }
    }
  }
  res.status(400);
  throw new Error("Incorrect Answers");
});

// @desc    Set user security questions
//@route    PUT /api/userQuestions
//@access   Private
const setSecurityQuestions = asyncHandler(async (req, res) => {
  const { email, _id } = req.user;
  const {securityQuestions} = req.body;

  if (!securityQuestions) {
    res.status(400);
    throw new Error("Please include Add Secuirty Questions");
  }

  const userExists = await User.findOne({ user: _id, email: email });
  if (!userExists) {
    res.status(400);
    throw new Error("User Does not exist");
  }

  if(userExists){

    //Hash Answer
    const salt = await bcrypt.genSalt(10);
    for (let index = 0; index < securityQuestions.length; index++) {
      const element = securityQuestions[index];
      element.answer = await bcrypt.hash(element.answer, salt);
    }

    const updateSecurityQuestions = await User.findByIdAndUpdate(userExists._id, {securityQuestions : securityQuestions})
    if (updateSecurityQuestions) {
      res.status(201).json({status: 'OK'});
    } else {
      res.status(400);
      throw new Error("error occured");
    }
  }else{
    res.status(400);
    throw new Error("Incorrect format");
  }
});

// @desc    Update user profile info
//@route    PUT /api/me
//@access   Public
const updateProfile = asyncHandler(async (req, res) => {
  const { email, _id } = req.user;
  const {profile} = req.body;
  let tempObj = {};
  
  if(profile.name && profile.name === ''){
    res.status(400);
    throw new Error("Profile name is empty");
  }

  if(profile.genresPref && profile.genresPref === [] || profile.genresPref === ''){
    res.status(400);
    throw new Error("Genre Preferences are empty");
  }

  profile?.name ? tempObj["name"] = profile.name: null;
  profile?.genresPref ? tempObj["genrePreferences"] = profile.genresPref : null;

  const user = await User.findOne({ email: email });
  if(user){
    const updatedProfile = await User.findByIdAndUpdate(user._id, tempObj)
    if(updatedProfile){
      res.status(200).json({status: 'OK'}) 
    }
  }
  else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

// @desc    Update a password
//@route    PUT /api/updatePassword
//@access   Private
const updatePassword = asyncHandler(async (req, res) => {
  const { email, _id } = req.user;
  const {confirmPassword, password} = req.body;

  if (!confirmPassword || !password) {
    res.status(400);
    throw new Error("Please include all fields");
  }

  const userExists = await User.findOne({ user: _id, email: email });
  if (!userExists) {
    res.status(400);
    throw new Error("User Does not exist");
  }

  if(userExists && (await bcrypt.compare(confirmPassword, userExists.password))){

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    const updateUserPassword = await User.findByIdAndUpdate(userExists._id, {password : hashedPassword})
    if (updateUserPassword) {
      res.status(201).json({status: 'OK'});
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }else{
    res.status(400);
    throw new Error("Incorrect password");
  }
});

// @desc    Get user data
//@route    GET /api/users/me
//@access   Private
const getMe = asyncHandler(async (req, res) => {
  let user = req.user;
  user._id = undefined;
  // req.user.createdAt = undefined;
  // req.user.updatedAt = undefined;
  // req.user.securityQuestions = undefined;
  res.status(200).json({
    name : req.user.name,
    email: req.user.email,
    genrePreferences : req.user.genrePreferences
  });
});

//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  updateProfile,
  setGenrePreferences,
  getMe,
  updatePassword,
  getSecurityQuestions,
  setSecurityQuestions,
  compareSecurityAnswers
};
