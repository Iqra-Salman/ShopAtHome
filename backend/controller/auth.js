import asyncHandler from "express-async-handler";
import User from "../Model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid email or password.");
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);

  if (!isPasswordValid) {
    res.status(400);
    throw new Error("Invalid email or password...");
  }

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token,
  });
});
//  PATH: /api/auth/signup
//METHOD: POST
//ACCESS:Public
//Desc:Register request by user

export const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("Unable to create account with this email");
  }
  const user = new User({
  
    name,
    email,
    password: hashPassword,
  });
  const createdUser = await user.save();
  const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  res.json({
    _id: createdUser._id,
    // FirstName: createdUser.firstName,
    // LastName: createdUser.lastName,
    name: createdUser.name,
    email: createdUser.email,
    isAdmin: createdUser.isAdmin,
    token: token,
  });
});
// export const editProfile = asyncHandler(async (req, res) => {
//   const { name, email, currentPassword, newPassword } = req.body;

//   let users = await User.findOne({ email });

//   if (!users) {
//     res.json(users);
//     //res.status(400);
//     //   throw new Error("Invalid email or password.");
//   }

//   const isPasswordValid = bcrypt.compareSync(currentPassword, users.password);

//   if (!isPasswordValid) {
//     res.status(400);
//     throw new Error("Password is incorrect");
//   }

//   const hashPassword = bcrypt.hashSync(newPassword, 10);

//   const Updateduser = {
//     name,
//     email,
//     password: hashPassword,
//   };

//   let updatedInfo = User.map((user) => {
//     let update = users.email == email ? Updateduser : user;
//     return update;
//   });

//   // users = await Updateduser.save();
//   const token = jwt.sign({ _id: createdUser._id }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });
//   res.json({
//     _id: updatedInfo._id,

//     name: updatedInfo.name,
//     email: updatedInfo.email,
//     isAdmin: updatedInfo.isAdmin,
//     token: token,
//   });
// });
export const editProfile = asyncHandler(async (req, res) => {
  
    const { name, email, currentPassword,confirmPassword, newPassword } = req.body;
    

    let user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = bcrypt.compareSync(currentPassword, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Incorrect password" });
      return;
    }
    if(!(newPassword==confirmPassword))
    {
      res.status(400).json({ message: "Password doesn't match" });
      return;

    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    const updatedUser = await user.save();

    const token = jwt.sign({ _id: updatedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: token,
    })
 


});
export const GetAllUsers = expressAsyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
