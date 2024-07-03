import mongoose from "mongoose";
import {Genre} from "./genres.js";
import Joi from "joi";

const MovieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
        trim: true,
    },
    genre: {type: Genre.schema, required: true},
    numberInStock: {type: Number, required: true, min: 0, max: 255},
    dailyRentalRate: {type: Number, min: 0, max: 255}
});

const Movie = mongoose.model("Movies", MovieSchema);

function validateMovies(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genre: Joi.object().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });

    return schema.validate(movie);
}

export {Movie, validateMovies as validate}