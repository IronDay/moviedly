import mongoose from "mongoose";
import Joi from "joi";

const Genre = mongoose.model("Genre", new mongoose.Schema({
    name: {type: String, required: true, minlength: 3, maxlength: 50}
}));

const validateGenre = (genre) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(genre);
}

export {Genre, validateGenre as validate};