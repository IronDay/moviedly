import express from 'express';
import genresRoutes from "./routes/genres.js";
import homeRoutes from "./middlewares/home.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_PRIVATE_URL

console.log("Mongo URL ", MONGO_URL);

const app = express();

mongoose.connect(`mongodb://${MONGO_URL || "mongodb://localhost:27017/moviedly"}`)
    .then(() => {
        console.log("Connected to MongoDB...");
    })
    .catch(err => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.get("/", homeRoutes);
app.use("/api/genres", genresRoutes);


app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on port ${PORT}...`);
    if (app.get('env') === 'production') {
        console.log('DB_PASSWORD:', process.env.APP_PASSWORD);
    }

    if (app.get('env') === 'development') {
        console.log('AP_PASSWORD: ', process.env.APP_PASSWORD);
    }
});
