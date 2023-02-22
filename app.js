require("dotenv/config");
const express = require("express");
const app = express();
const connectDb = require("./db/connect");
const cors = require("cors");


// Routes
const authRouter = require("./routes/auth");
const songRouter = require("./routes/song");


// body paser
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cors({origin : true}));


app.get("/", (req, res) => {
    res.send("hello would");
})

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/song',songRouter);

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