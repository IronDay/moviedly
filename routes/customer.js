import express from "express";
import {Customer, validate} from "../models/customers.js";

const customerRoute = express.Router();

customerRoute.get("/", async (req, res) => {
    const customers = await Customer.find({}).sort({name: 1});
    res.status(200).send(customers);
});

customerRoute.post("/", async (req, res) => {
    const customer = req.body;
    const {error} = validate(customer);

    if (error) return res.status(400).send(error.message);
    const c = new Customer(customer);
    const savedCustomer = await c.save();

    return res.status(201).send(savedCustomer);
});

customerRoute.put("/:id", (req, res) => {
    const {error} = validate(req.body);
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

customerRoute.delete("/:id", (req, res) => {
    Customer.findByIdAndDelete({_id: req.params.id}).then((result) = res.send(result))
        .catch((err) => res.send(err));
})


export default customerRoute;