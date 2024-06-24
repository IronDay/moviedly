import express from 'express';
import genresRoutes from "./routes/genres.js";
import homeRoutes from "./middlewares/home.js";

const PORT = process.env.PORT || 3000;

const app = express();

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