import express from "express";
import {
  register,
  login,
  getType,
  forgotpassword,
  resetpassword,
} from "../controllers/auth.js";
const router = express.Router();

// all the logic in controllers folder
//
router.route("/register").post(register);

// sending info in the body must be a post

router.route("/resetpassword/:resetToken").post(resetpassword);

router.route("/forgotpassword").post(forgotpassword);

router.route("/login").post(login);

router.route("/login").get(getType);

export default router;
