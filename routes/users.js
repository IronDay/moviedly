import express from "express";
import { Users } from "../models/users.js";

const usersRouter = express.Router();

usersRouter.get("/", (req, res) => {
  return res.status(200).send(Users.find());
});
