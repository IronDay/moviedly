import express from "express";
import {Movie, validate} from "../models/movies.js";

const moviesRoutes = express.Router();

moviesRoutes.get("/", async (req, res) => {
    const movies = await Movie.find();
    return res.send(movies);
});

moviesRoutes.get("/:id", (req, res) => {
    Movie.findById(req.params.id)
        .then((movie) => res.send(movie))
        .catch((error) => res.status(400).send(error.message));
});

moviesRoutes.post("/", async (req, res) => {
    const {body} = req;
    const {error} = validate(body);
    if (error) return res.status(400).send(error);

    let movie = new Movie(body);
    movie = await movie.save();
    res.status(201).send(movie)
});

moviesRoutes.put("/:id", async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error);

    Movie.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            ...req.body
        }
    }, {new: true})
        .then((result) => res.send(result))
        .catch((error) => res.status(400).send(error.message));
});

moviesRoutes.delete("/:id", (req, res) => {
    Movie.findByIdAndDelete(req.params.id)
        .then((deletedMovie) => res.send(deletedMovie))
        .catch((error) => res.status(400).send(error.message));
})

export default moviesRoutes;