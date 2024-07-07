import mongoose from "mongoose";
import {Movie} from "./movies.js";
import {Customer} from "./customers.js";
import Joi from "joi";

const rentalSchema = new mongoose.Schema({
    movie: {type: Movie.schema, required: true},
    customer: {type: Customer.schema, required: true},
    startDate: {type: Date, required: true, default: Date.now()},
    endDate: {type: Date, required: true},
    returnDate: {type: Date, required: false},
    price: {type: Number, required: true},
    lateFee: {type: Number, required: false, default: 0.0},
    rentalStatus: {type: Boolean, default: false}
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
    const schema = Joi.object({
        movie: Joi.string().required(),
        customer: Joi.string().required(),
        startDate: Joi.date(),
        endDate: Joi.date().required(),
        returnDate: Joi.date().optional(),
        price: Joi.number().min(0.0).max(25).required(),
        lateFee: Joi.number().min(0.0).optional()
    });

    return schema.validate(rental);
}

export {Rental, validateRental as validate};