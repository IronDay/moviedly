import express from "express";
import { Genre, validate } from "../models/genres.js";
import auth from "../middlewares/auth.js";

const genresRoutes = express.Router();

genresRoutes.get("/", (req, res) => {
  Genre.find({})
    .sort({ name: 1 })
    .then((genres) => res.send(genres));
});

genresRoutes.get("/:id", (req, res) => {
  Genre.findById(req.params.id)
    .then((genre) => res.json(genre))
    .catch((error) => res.status(404).send("Genre not found"));
});

genresRoutes.post("/", auth, (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre(req.body);
  genre
    .validate()
    .then(() => {
      genre
        .save()
        .then(() => {
          res.status(201).send(genre);
        })
        .catch((err) => {
          res.status(400).send(err.message);
        });
    })
    .catch((error) => res.status(400).send(error.errors));
});

genresRoutes.put("/:id", (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  Genre.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
      },
    },
    { new: true },
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

genresRoutes.delete("/:id", (req, res) => {
  Genre.findByIdAndDelete({ _id: req.params.id })
    .then((result) => res.send(result))
    .catch((error) => res.status(400).send(error));
});

export default genresRoutes;
