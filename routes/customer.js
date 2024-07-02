import express from "express";
import mongoose from "mongoose";
import {Customer, validate} from "../models/customer.js";


const CustomerModel = mongoose.model("Customer", Customer);

const customerRouter = express.Router();

customerRouter.get("/", async (req, res) => {
    const customers = await CustomerModel.find({}).sort({name: 1});
    res.status(200).send(customers);
});

customerRouter.post("/", async (req, res) => {
    const customer = req.body;
    const {error} = validate(customer);

    if (error) return res.status(400).send(error.message);
    const c = new CustomerModel(customer);
    const savedCustomer = await c.save();

    return res.status(201).send(savedCustomer);
});

customerRouter.put("/:id", (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    CustomerModel.findByIdAndUpdate({_id: req.params.id}, {
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
    CustomerModel.findByIdAndDelete({_id: req.params.id}).then((result) = res.send(result))
        .catch((err) => res.send(err));
})


export default customerRouter;