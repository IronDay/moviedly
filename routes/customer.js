import mongoose from "mongoose";
import express from "express";
import Joi from "joi";

const customerSchema = new mongoose.Schema({
    isGold: {type: Boolean, default: false},
    name: {type: String, min: 5, max: 50, required: true},
    phone: {type: String, min: 5, max: 50, required: true}
});

const Customer = mongoose.model("Customer", customerSchema);

const customerRouter = express.Router();

customerRouter.get("/", async (req, res) => {
    const customers = await Customer.find({}).sort({name: 1});
    res.status(200).send(customers);
});

customerRouter.post("/", async (req, res) => {
    const customer = req.body;
    const {error} = validateCustomer(customer);

    if (error) return res.status(400).send(error.message);
    const c = new Customer(customer);
    const savedCustomer = await c.save();

    return res.status(201).send(savedCustomer);
});

customerRouter.put("/:id", (req, res) => {
    const {error} = validateCustomer(req.body);
    if (error) return res.status(400).send(error.message);

    Customer.findByIdAndUpdate({_id: req.params.id}, {
        $set: {
            ...req.body
        }
    }, {new: true}).then(result => {
        res.status(200).send(result);
    }).catch(err => {
        res.status(400).send(err.message);
    });
});

customerRouter.delete("/:id", (req, res) => {
    Customer.findByIdAndDelete({_id: req.params.id}).then((result) = res.send(result))
        .catch((err) => res.send(err));
})

const validateCustomer = (customer) => {
    const customerValidationSchema = Joi.object({
        isGold: Joi.boolean().optional(),
        name: Joi.string().required().min(5).max(50),
        phone: Joi.string().required().max(50)
    });

    return customerValidationSchema.validate(customer);
}

export default customerRouter;