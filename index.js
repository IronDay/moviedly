import express from "express";
import mongoose from "mongoose";
import config from "config";
import genresRoutes from "./routes/genres.js";
import homeRoutes from "./middlewares/home.js";
import customerRoute from "./routes/customer.js";
import moviesRoutes from "./routes/movies.js";
import rentalRoutes from "./routes/rental.js";

import objectId from "joi-objectid";
import Joi from "joi";
import usersRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";

//use this to validate the id send in a request
Joi.objectId = objectId(Joi);

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect(`${MONGO_URL}`)
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.get("/", homeRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/customers", customerRoute);
app.use("/api/movies", moviesRoutes);
app.use("/api/rental", rentalRoutes);
app.use("/api/users", usersRoute);
app.use("/api/auth", authRoute);

app.listen(
  PORT,
  /*"0.0.0.0",*/ () => {
    console.log(`Listening on port ${PORT}...`);
    if (app.get("env") === "production") {
      console.log("DB_PASSWORD:", process.env.APP_PASSWORD);
    }

    if (app.get("env") === "development") {
      console.log("MONGO URL: ", process.env.MONGO_URL);
    }
  },
);
