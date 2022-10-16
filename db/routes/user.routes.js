const express = require('express')
const router = express.Router();
const cors = require('cors');

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

// get one user
router.get('/users/login', cors(corsOptionsDelegate), (req, res) => { 
  let param = req.query.username;
  let sql = `SELECT id FROM users where username = '${param}'`; 

  // TODO: Add password authentication and hashing

  db.query(sql, (err, data, fields) => { 
    if (err) {
      throw err;
    }
    res.json({
      status: 200,
      data,
      fields,
      messsage: "Retrieved user successfully"
    })
  })
});

// get user lists
router.get('/users/list', cors(corsOptionsDelegate), function(req, res) {
  let sql = `SELECT * FROM users`;
  db.query(sql, function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully"
    })
  })
});

// create new user
router.post('/users/new', cors(corsOptionsDelegate), function(req, res) {
  let sql = `INSERT INTO users(username, password, email, phone, company) VALUES (?)`;
  let values = [
    req.body.username,
    req.body.password,
    req.body.email,
    req.body.phone,
    req.body.company
  ];
  db.query(sql, [values], function(err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      message: "New user added successfully"
    })
  })
});

module.exports = router;