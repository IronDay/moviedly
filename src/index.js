import express from 'express';
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(port, "0.0.0.0", () => {
    console.log("Listening on port 3000...");
});
