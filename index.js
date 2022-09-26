const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const mysql = require('mysql');
const router = require('./db/routes/user.routes');

db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Kr@kat0a',
  database: 'my_db'
})



db.connect(function(err) {
  if (err) throw err
  console.log('Connected to MySQL Database.');
});


dotenv.config();
const app = express();
const port = process.env.PORT || 5000;



//registering middlewares
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', router);


app.listen(port, () => {
  console.log(`Connected to express at port ${port}`);
});