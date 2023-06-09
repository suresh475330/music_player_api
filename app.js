const express = require("express");
const app = express();
const connectDb = require("./db/connect");
require("dotenv").config();


// extra security packages
const cors = require("cors");
const helmet = require("helmet"); 
const xss = require("xss-clean"); 
const rateLimit = require("express-rate-limit"); 


// Routes
const authRouter = require("./routes/auth");
const songRouter = require("./routes/song");
const artistRouter = require("./routes/artist");
const albumRouter = require("./routes/album");
const favouriteRouter = require("./routes/favourite");


app.set('trust proxy', 1)
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(xss());


app.get("/", (req, res) => {
    res.set('Content-Type', 'text/html')
    res.status(200).send(`<h1>Welcome to music player api</h1>`);
})

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/song',songRouter);
app.use('/api/v1/artist',artistRouter);
app.use('/api/v1/album',albumRouter);
app.use('/api/v1/favourite',favouriteRouter);

app.get("*", (req, res) => {
    res.status(404).send("<h1>No route is there!</h1>");
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