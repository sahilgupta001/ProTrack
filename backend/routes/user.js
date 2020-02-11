const express     = require('express');
const router      = express.Router();
const connection  = require('../db-config');
const bcrypt      = require('bcrypt');
const saltRounds  = 10;
const jwt         = require('jsonwebtoken');
const checkAuth   = require('../middleware/check-auth');
var departments = [];


router.post('/login', (req, res, next) => {
  let email = req.body.email;
  let fetchedUser;
  let query = "select * from user where email_id = '" + email + "'";
  connection.query(query, function(err, results) {
    if(err) {
      throw err;
    } else if (results.length > 0){
        fetchedUser = results;
        passMatch(req.body.password, results[0].password, function(err, result) {
          if(err) {
            return res.status(401).json({
              message: err
            })
          } else {
            const token = jwt.sign({ email: results[0].email_id, userId: results[0].user_id}, process.env.JWT_KEY, { expiresIn: '1h' });
            return res.status(201).json({
              token: token,
              message: "User is now authenticated and has been logged in..",
              user_id: fetchedUser[0].user_id,
              role_id: fetchedUser[0].role_id,
              expiresIn: 3600
            })
          }
        });
      } else {
        res.status(401).json({
          message: 'Invalid authentication details'
        });
    }
  });
});


function passMatch(toValidatePass, dbPass, callback) {
  bcrypt.compare(toValidatePass, dbPass)
    .then(result => {
      if(result === false) {
        return callback("This is an invalid password", false);
      } else {
          return callback(false , result);
        }
    })
}

router.get('/getDepartments', (req, res, next) => {
  connection.query("select * from department where department_id not in('admin')", function(err, results) {
    if(err) {
      res.status(500).json({
        message: 'Unable to load the data from the backend'
      })
    } else {
      departments = [];
      Object.keys(results).forEach(function(key) {
        var row = results[key];
        departments.push(row.department_id);
      });
      res.status(200).json({
        message: 'Successfully fetched all the departments',
        department: departments
      });
    }
  })
});


router.post('/signup', checkAuth, (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if(err) {
      console.log(err);
    } else {
      const createUser = [
        [
          null,
          req.body.email,
          hash,
          req.body.phone_no,
          req.body.lname,
          req.body.fname,
          req.body.department_id,
          null
        ]
      ];
      connection.query('INSERT INTO USER VALUES ?', [createUser], function(err, results) {
        if(err) {
          res.status(500).json({
            message: err.sqlMessage
          });
        }
        else {
          res.status(200).json({
            message: 'The user is now created'
          });
        }
      });
    }
  });
})

router.put('/validateEmail', (req, res, next) => {
  connection.query('SELECT COUNT(*) AS COUNT FROM USER WHERE EMAIL_ID = ?', [req.body.emailId], function(err, results) {
    if(err) {
      console.log(err);
    } else if (results[0].COUNT > 0) {
        res.status(201).json( {
          message: 'Email Id already exists',
          flag: false
        });
      } else {
        res.status(201).json({
          message: 'Email Id is unique',
          flag: true
        });
      }
  });
});

module.exports = router;
