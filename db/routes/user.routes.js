const express = require('express'),
  router = express.Router();

// get one user
router.get('/users/login', (req, res) => { 
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
router.get('/users/list', function(req, res) {
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
router.post('/users/new', function(req, res) {
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