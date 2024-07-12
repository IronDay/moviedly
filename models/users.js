import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "config";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 20 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, config.get("jwtPrivateKey"));
};

const UsersModel = mongoose.model("Users", userSchema);

function validateUser(user) {
  const userSchema = Joi.object({
    name: Joi.string().min(5).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return userSchema.validate(user);
}

export { UsersModel as Users, validateUser as validate };
