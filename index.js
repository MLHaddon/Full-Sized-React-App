const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();
const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;



//registering middlewares
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

require('./db/config/mongoose.config');

app.listen(port, () => {
  console.log(`Connected to express at port ${port}`);
});