import mongoose from "mongoose";
import express from "express";
import Joi from "joi";

const customerSchema = new mongoose.Schema({
    isGold: {type: Boolean, default: false},
    name: {type: String, min: 5, max: 20},
    phone: {type: String}
});

const Customer = mongoose.model("Customer", customerSchema);

const customerRouter = express.Router();

customerRouter.get("/", async (req, res) => {
    const customers = await Customer.find({}).sort({name: 1});
    res.status(200).send(customers);
})

const validateCustomer = (customer) => {
    const customerValidationSchema = Joi.object({
        isGold: Joi.boolean().optional(),
        name: Joi.string().required().min(5).max(50),
        phone: Joi.string().max(10)
    });

    return customerValidationSchema.validate(customer);
}