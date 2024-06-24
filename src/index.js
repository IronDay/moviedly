import express from 'express';

const app = express();
app.use(express.json());

if (app.get('env') === 'development') {
    const app_password = process.env.APP_PASSWORD;
    console.log(app_password);
}

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Listening on port 3000...");
    if (app.get('env') === 'production') {
        const db_password = process.env.DB_PASSWORD;
        console.log("The APP_PASSWORD is ", db_password);
    }
});