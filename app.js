const express = require("express");
const app = express();
const connectDb = require("./db/connect");
const cors = require("cors");
require("dotenv").config();


// Routes
const authRouter = require("./routes/auth");
const songRouter = require("./routes/song");
const artistRouter = require("./routes/artist");
const albumRouter = require("./routes/album");


// body paser
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors());


app.get("/", (req, res) => {
    res.send("hello would");
})

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/song',songRouter);
app.use('/api/v1/artist',artistRouter);
app.use('/api/v1/album',albumRouter);

app.get("*", (req, res) => {
    res.status(404).send("No route is there!");
})

const port = process.env.PORT || 5000;

const Start = async () => {
    try {
        await connectDb(process.env.MONGODB_URI)
        app.listen(port, () => {
            console.log(`Server is listen on http://127.0.0.1:${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}

Start();