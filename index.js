import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

var allowlist = process.env.ALLOW_LIST || ['http://localhost:3000'];
var corsOptionsDelegate = function (req, callback) {
var corsOptions = {
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};

if (allowlist.indexOf(req.header('Origin')) !== -1) {
  corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
} else {
  corsOptions = { origin: false } // disable CORS for this request
}
callback(null, corsOptions) // callback expects two parameters: error and options
}

// Middlewares
app.use(cors(corsOptionsDelegate));
app.use(cookieParser());
app.use(express.json());
app.use('/api', router);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
