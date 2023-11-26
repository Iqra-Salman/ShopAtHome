import express from "express";
import { GetAllUsers, editProfile, login, signup } from "../controller/auth.js";

const routes = express.Router();
routes.post("/login", login);
routes.post("/signup", signup);
routes.put("/profile", editProfile);
routes.get("/users", GetAllUsers);

export default routes;
