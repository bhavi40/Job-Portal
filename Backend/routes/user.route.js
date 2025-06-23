import express from "express";
import {register,login,updateProfile,logout} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

//u will get router from express

const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
//Here we need to update profile for only authenticated users so we are creating middleware folder for that
router.route("/profile/update").post(isAuthenticated,updateProfile);
router.route("/logout").get(logout);

export default router;

