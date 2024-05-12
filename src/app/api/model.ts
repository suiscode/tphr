import { careers, countries, degree, salary, timeshift } from "@/lib/model";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
    cv: { type: Schema.Types.ObjectId, ref: "CV" },
  },
  { timestamps: true }
);

const cvSchema = new Schema({
  about: String,
  education: String,
  experience: String,
  skills: [String],
  firstName: String,
  lastName: String,
  registerID: {
    type: String,
  },
  gender: String,
  bDay: Date,
  phoneNumber: String,
  email: {
    type: String,
    unique: true,
  },
  address: String,
  career: {
    type: String,
    enum: careers,
  },
  salaryExpectency: {
    type: String,
    enum: salary,
  },
  workDuration: {
    type: String,
    enum: timeshift,
  },
  degree: {
    type: String,
    enum: degree,
  },
  schoolCountry: {
    type: String,
    enum: countries,
  },
  GPA: String,
  schoolName: String,
  instagram: String,
  facebook: String,
  linkedin: String,
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const passwordResetTokenSchema = new Schema({
  email: String,
  token: {
    type: String,
    unique: true,
    required: true,
  },
  expires: Date,
});


export const PasswordResetToken =
  mongoose.models.PasswordResetToken ||
  mongoose.model("PasswordResetToken", passwordResetTokenSchema);

export const User = mongoose.models.User || mongoose.model("User", userSchema);

export const CV = mongoose.models.CV || mongoose.model("CV", cvSchema);
