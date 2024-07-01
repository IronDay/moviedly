import mongoose from "mongoose";
import express from "express";

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

