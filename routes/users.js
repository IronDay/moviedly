import express from "express";
import _ from "lodash";
import { Users, validate } from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "config";

const usersRoute = express.Router();

usersRoute.get("/", (req, res) => {
  return res.status(200).send(Users.find());
});

usersRoute.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let fetchedUser = await Users.findOne({ email: req.body.email });
  if (fetchedUser) return res.status(400).send("User already registered");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await new Users({
    ...req.body,
    password: hashedPassword,
  }).save();

  const token = jwt.sign({ _id: user._id }, config.get("jwtPrivateKey"));

  return res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

usersRoute.get("/:id", async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (!user) return res.send("user not found");

  res.send(user);
});

export default usersRoute;
