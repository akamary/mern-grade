import User from "../models/user.js";
import ErrorResponse from "../errorResponse.js";
//import sendConfirmationEmail from "../sendEmail.js";

export const register = async (req, res, next) => {
  const { username, email, password, type } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      type,
    });

    //sendConfirmationEmail(user);
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(
      new ErrorResponse("Please provide a username and a password", 400)
    );
  }

  try {
    const user = await User.findOne({ username }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("Email could not be sent", 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    const message = `
    <h1> You have requested a password reset</h1>
    <p> Please go to this link to reset your password </p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
    } catch {}
  } catch (error) {}
};

export const resetpassword = async (req, res, next) => {};

export const getType = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({
    success: true,
    token,
  });
};
