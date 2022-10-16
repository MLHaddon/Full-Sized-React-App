import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";

// Add cors options
var allowlist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
var corsOptions;
if (allowlist.indexOf(req.header('Origin')) !== -1) {
  corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
} else {
  corsOptions = { origin: false } // disable CORS for this request
}
callback(null, corsOptions) // callback expects two parameters: error and options
}

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

//registering middlewares
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Connected to express at port ${port}`);
});