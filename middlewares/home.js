import express from "express";

const homeRoutes = express.Router();

homeRoutes.get("/", (req, res) => {
    res.send("Welcome to my movies API");
});

export default homeRoutes