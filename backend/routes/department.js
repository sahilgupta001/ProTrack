var express = require('express');
var router = express.Router();
const connection = require('../db-config');

router.post('/', (req, res, next) => {
  const createDepartment = [
    [
      req.body.department_id,
      req.body.department_name
    ]
  ];
  connection.query('INSERT INTO DEPARTMENT VALUES ?', [createDepartment], function(err, createdDepartment){
    if(err) {
      res.status(500).json({
        message: err.sqlMessage
      });
    } else {
      console.log(createdDepartment);
      res.status(200).json({
        message: 'The Department is now created'
      });
    }
  })
});


router.post('/createRole', (req, res, next) => {
  const createRole = [
    [
      req.body.department_id,
      req.body.role_id,
      req.body.role_name
    ]
  ];

  connection.query('INSERT INTO ROLES VALUES ?', [createRole], function(err, createdRole) {
    if(err) {
      res.status(500).json({
        message: err.sqlMessage
      })
    } else {
      console.log(createdRole);
      res.status(200).json({
        message: "The role has been successfully created",
      })
    }
  })
})

router.get('/:deptId', (req, res, next) => {
  connection.query('select user_id, fname, lname, email_id, phone_no, role_id from user where department_id = ?', [req.params.deptId], function(err, results) {
    if(err) {
      res.status(500).json({
        message: 'Unable to fetch data from the database'
      })
    } else {
      connection.query('select rol_name from roles where department_id = ?', [req.params.deptId], function(err, results1) {
        if(err) {
          res.status(500).json({
            message: 'Error in fetching the roles for this department'
          })
        } else {
          res.status(200).json({
            message: 'The data has been fetched successfully',
            userData: results,
            rolesData: results1
          })
        }
      })
    }
  })
});

router.get('/getUsers/:deptId', function(req, res, next) {
  var sql = "select user_id, fname, lname from user where department_id = ?";
  connection.query(sql, [req.params.deptId], function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'The data was not fetched'
      });
    } else {
        if(result.length > 0) {
          res.status(200).json({
            message: 'The users for the given department have been fetched successfully',
            data: result
          });
        } else {
          res.status(200).json({
            message: 'There are no managers for this department',
            data: []
          });
        }
      }
  });
});


router.post('/assignRole', (req, res, next) => {
  connection.query('select role_id from roles where rol_name = ? && department_id = ?', [req.body.role, req.body.department], function(err, results) {
    if(err) {
      res.status(500).json({
        message: 'The role_id was not fetched'
      });
    } else {
      // console.log(results[0].role_id);
      // console.log(req.body.userId);
        connection.query('update user set role_id = ? where user_id = ?', [results[0].role_id, req.body.userId], function(err, results1) {
          if(err) {
            res.status(500).json({
              message: 'Role not assigned'
            })
          } else {
            res.status(200).json({
              message: 'The role has been successfully assigned'
            })
          }
        })
    }
  })
})

router.get('/getManagers/:deptId', function(req, res, next) {
  var sql;
  if(req.params.deptId == "PVG_101") {
    sql = "select user_id, fname, lname from user where department_id = ? and role_id = 'PVG_MNG_104'";
  } else {
    sql = "select user_id, fname, lname from user where department_id = ? and role_id = 'PU_MNG_104'";
  }
  console.log(sql);
  connection.query(sql, [req.params.deptId], function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'The data was not fetched'
      });
    } else {
      // console.log(result);
        if(result.length > 0) {
          res.status(200).json({
            message: 'The managers for the given department have been fetched successfully',
            data: result
          });
        } else {
          res.status(200).json({
            message: 'There are no managers for this department',
            data: []
          });
        }
      }
  });
});

module.exports = router;

