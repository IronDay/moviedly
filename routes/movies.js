import express from "express";
import {Movie, validate} from "../models/movies.js";

const moviesRoutes = express.Router();

moviesRoutes.get("/", async (req, res) => {
    const movies = await Movie.find();
    return res.send(movies);
});

moviesRoutes.post("/", async (req, res) => {
    const {body} = req;
    const {error} = validate(body);
    if (error) return res.status(400).send(error);

    const movie = new Movie(body);
    res.status(201).send(await movie.save())
})


export default moviesRoutes;