import express from "express";
import Joi from "joi";

const genresRoutes = express.Router();

const genres = [
    {id: 1, name: "Action"},
    {id: 2, name: "Horror"},
    {id: 3, name: "Comedy"},
    {id: 4, name: "Drama"},
    {id: 5, name: "Thriller"},
    {id: 6, name: "Romance"},
    {id: 7, name: "Sci-Fi"},
    {id: 8, name: "Fantasy"},
    {id: 9, name: "Mystery"},
    {id: 10, name: "Documentary"}];

genresRoutes.get("/", (req, res) => {
    res.json(genres);
});

genresRoutes.get("/:id", (req, res) => {
    const genre = genres[parseInt(req.params.id)];
    if (!genre) return res.status(404).send("Genre not found");
    res.json({genre});
});

genresRoutes.post("/", (req, res) => {
    const {error, value} = validateGenre(req.body);

    if (error) {
        return res.status(400).send(error.details);
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    return res.send(value);
});

genresRoutes.put("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send("Genre not found");

    const {error} = validateGenre(req.body);
    if (error) {
        return res.status(400).send(error.details);
    }

    genre.name = req.body.name;
    res.send(genre);
});

genresRoutes.delete("/:id", (req, res) => {
    const genre = genres.find(g => g.id === parseInt(req.params.id));

    if (!genre) return res.status(404).send("Genre not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre);
});

const validateGenre = (genre) => {
    const schema = Joi.object({
        id: Joi.number().optional(),
        name: Joi.string().min(3).required()
    });

    return schema.validate(genre);
}

export default genresRoutes;