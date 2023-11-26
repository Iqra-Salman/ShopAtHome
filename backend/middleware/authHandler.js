import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../Model/user.js";

const authHandler = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      const [, token] = req.headers.authorization.split(" ");
      const { _id } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(_id).select("-password");
      if (!user) {
        res.status(401);
        throw new Error("Unauthorized");
      }
      req.user = user;
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error("Unauthorized");
    }
  } else {
    res.status(401);
    throw new Error("Unauthorized");
  }
});

export const adminHandler=asyncHandler(async(req,res,next)=>{
  if(req.user.isAdmin){
    next();
  }else{
    res.status(401);
    throw new Error("Unauthorized")
  }
})

export default authHandler;
