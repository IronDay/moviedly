import express from 'express';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Listening on port ${PORT}...`);
    if (app.get('env') === 'production') {
        console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
    }

    if(app.get('env') === 'development') {
        console.log('AP_PASSWORD: ', process.env.APP_PASSWORD);
    }
});
