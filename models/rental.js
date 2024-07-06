import mongoose from "mongoose";
import {Movie} from "./movies.js";
import {Customer} from "./customers.js";
import Joi from "joi";

const rentalSchema = new mongoose.Schema({
    movie: {type: Movie.schema, required: true},
    customer: {type: Customer.schema, required: true},
    startDate: {type: Date, required: true, default: Date.now()},
    endDate: {type: Date, required: true},
    returnDate: {type: Date, required: true},
    price: {type: Number, required: true},
    lateFee: {type: Number, required: false, default: 0.0}
});

const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
    const schema = Joi.object({
        movie: Joi.string().required(),
        customer: Joi.string().required(),
        startDate: Joi.dateTime().required(),
        endDate: Joi.dateTime().required(),
        returnDate: Joi.dateTime().required(),
        price: Joi.number().min(0.0).max(25).required(),
        lateFee: Joi.number().min(0.0).optional()
    })
}

export default Rental;