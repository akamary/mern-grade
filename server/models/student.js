import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const StudentSchema = mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

// pre-saving, running async func before save
StudentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  // returns a promise.. async
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

StudentSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

StudentSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const student = mongoose.model("student", StudentSchema);

export default student;
