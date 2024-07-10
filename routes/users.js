import express from "express";
import { Users, validate } from "../models/users.js";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  return res.status(200).send(Users.find());
});

usersRouter.post("/", (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.send(400).send(error.details[0].message);

  const user = new Users({ ...req.body }).save();
  return res.send(user);
});
