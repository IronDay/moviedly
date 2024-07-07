import express from "express";
import { Movie } from "../models/movies.js";
import { Rental, validate } from "../models/rental.js";
import { Customer } from "../models/customers.js";
import movies from "./movies.js";

const rentalRoutes = express.Router();

rentalRoutes.get("/", async (req, res) => {
  const rentals = await Rental.find();
  return res.send(rentals);
});

rentalRoutes.get("/:id", (req, res) => {
  Rental.findById(req.params.id)
    .then((rental) => res.send(rental))
    .catch((error) => res.status(400).send(error.message));
});

rentalRoutes.post("/", async (req, res) => {
  const { body } = req;

  const { error } = validate(body);
  if (error) return res.status(400).send(error.details[0].message);

  let fetchedMovie = await Movie.findById(body.movie);
  if (!fetchedMovie) return res.status(400).send("Movie not found.");
  if (fetchedMovie.numberInStock === 0)
    return res.status(400).send("Movie not in stock.");

  const fetchedCustomer = await Customer.findById(body.customer);
  if (!fetchedCustomer)
    return res.status(400).send("Customer not found. Register first please");

  let rental = new Rental({
    ...body,
    movie: fetchedMovie,
    customer: fetchedCustomer,
  });
  rental = await rental.save();

  fetchedMovie.numberInStock--;
  fetchedMovie.save();

  res.status(201).send(rental);
});

rentalRoutes.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const fetchedMovie = await Movie.findById(req.body.movie);
  if (!fetchedMovie) return res.status(400).send("Movie not found.");

  const fetchedCustomer = await Customer.findById(req.body.customer);
  if (!fetchedCustomer)
    return res.status(400).send("Customer not found. Register first please");

  Rental.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        ...req.body,
        movie: fetchedMovie,
        customer: fetchedCustomer,
      },
    },
    { new: true },
  )
    .then((result) => res.send(result))
    .catch((error) => res.status(400).send(error.message));
});

rentalRoutes.delete("/:id", (req, res) => {
  Movie.findByIdAndDelete(req.params.id)
    .then((deletedRental) => res.send(deletedRental))
    .catch((error) => res.status(400).send(error.message));
});

export default rentalRoutes;
