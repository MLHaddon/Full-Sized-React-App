const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const mysql = require('mysql');
const router = require('./db/routes/user.routes');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

//registering middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use('/api', router);

db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'my_db'
})

db.connect(function(err) {
  if (err) throw err
  console.log('Connected to MySQL Database.');
});

app.listen(port, () => {
  console.log(`Connected to CORS-express at port ${port}`);
});