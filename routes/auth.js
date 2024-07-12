import express from "express";
import { Users } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";

const authRoute = express.Router();

authRoute.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let fetchedUser = await Users.findOne({ email: req.body.email });
  if (!fetchedUser) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    fetchedUser.password,
  );
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = jwt.sign({ _id: fetchedUser._id }, "jwtPrivateKey");
  res.send(token);
});

function validate(req) {
  const userSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return userSchema.validate(req);
}

export default authRoute;
