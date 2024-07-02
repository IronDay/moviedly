import mongoose from "mongoose";
import Joi from "joi";

const CustomerSchema = new mongoose.Schema({
    isGold: {type: Boolean, default: false},
    name: {type: String, min: 5, max: 50, required: true},
    phone: {type: String, min: 5, max: 50, required: true}
});

const validateCustomer = (customer) => {
    const customerValidationSchema = Joi.object({
        isGold: Joi.boolean().optional(),
        name: Joi.string().required().min(5).max(50),
        phone: Joi.string().required().min(5).max(50)
    });

    return customerValidationSchema.validate(customer);
}

export {CustomerSchema as Customer, validateCustomer as validate};