import express from "express";
import mongoose from "mongoose";
import Joi from "joi";

const genresRoutes = express.Router();

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50}
}));

/*const genreCount = await Genre.find({}).size();
if (genreCount === 0) {
    Genre.find({}).then((result) => {
        if (result.length === 0)
            Genre.insertMany([
                {name: "Action"},
                {name: "Horror"},
                {name: "Comedy"},
                {name: "Drama"},
                {name: "Thriller"},
                {name: "Romance"},
                {name: "Sci-Fi"},
                {name: "Fantasy"},
                {name: "Mystery"},
                {name: "Documentary"}]
            );
    })
}*/


genresRoutes.get("/", (req, res) => {
    Genre.find({})
        .sort({name: 1})
        .then((genres) => res.send(genres));
});

genresRoutes.get("/:id", (req, res) => {
    Genre.findById(req.params.id)
        .then((genre) => res.json(genre))
        .catch((error) => res.status(404).send("Genre not found"));
});

genresRoutes.post("/", (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = new Genre(req.body);
    genre.validate().then(() => {
        genre.save().then(() => {
            res.status(201).send(genre);
        }).catch(err => {
            res.status(400).send(err.message);
        });
    }).catch((error) => res.status(400).send(error.errors));
});

genresRoutes.put("/:id", (req, res) => {
    const {error} = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    Genre.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            name: req.body.name
        }
    }, {new: true}).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send(err.message);
    });
});

genresRoutes.delete("/:id", (req, res) => {
    /* const genre = genres.find(g => g.id === parseInt(req.params.id));

     if (!genre) return res.status(404).send("Genre not found");

     const index = genres.indexOf(genre);
     genres.splice(index, 1);
     res.send(genre);*/
    Genre.findByIdAndDelete({_id: req.params.id}).then((result) => res.send(result))
        .catch((error) => res.status(400).send(error));
});

const validateGenre = (genre) => {
    const schema = Joi.object({
        /* id: Joi.number().optional(),*/
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(genre);
}

export default genresRoutes;