import express from "express";
import {Movie, validate} from "../models/movies.js";

const moviesRoutes = express.Router();

moviesRoutes.get("/", async (req, res) => {
    const movies = await Movie.find();
    return res.send(movies);
});

export default moviesRoutes;