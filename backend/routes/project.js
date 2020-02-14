const express = require('express');
const router = express.Router();
const connection = require('../db-config');

router.get('/', function(req, res, next) {
  connection.query('select * from project', function(err, projects) {
    if(err) {
      res.status(500).json({
        message: 'The projects were not fetched'
      });
    }
    else {
      res.status(200).json({
        message: 'Projects were fetched successfully',
        projects: projects,
        length: projects.length
      })
    }
  })
});

router.get('/projectDetail/:projectId', function(req, res, next) {
  const sql = 'select * from pro_' + req.params.projectId;
  connection.query('select * from project where project_id = ?', [req.params.projectId], function(err, projectInfo) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'Unable to fetch the data',
        error: err.sqlMessage
      });
    } else {
      connection.query(sql, function(err, iterationInfo) {
        if(err) {
          res.status(500).json({
            message: 'Unable to fetch the data',
            error: err.sqlMessage
          });
        }
        else {
          res.status(200).json({
            message: 'The data has been fetched successfully',
            iterationData: iterationInfo,
            projectData: projectInfo
          });
        }
      });
    }
  });
});


router.get('/userProjects/:userId', function(req, res, next) {
  connection.query('select * from project where currently_assigned_user = ?', [req.params.userId], function(err, projects) {
    if(err) {
      res.status(500).json({
        message: 'The projects were not fetched'
      });
    }
    else {
      res.status(200).json({
        message: 'Projects are fetched successfully',
        projects: projects,
        length: projects.length
      })
    }
  })
});


router.post('/', function(req, res, next) {
  const date = new Date();
  const data = [
    [
      req.body.project_id,
      req.body.project_name,
      req.body.client,
      req.body.initial_department_id,
      date,
      req.body.status,
      req.body.initial_department_id,
      1020
    ]
  ];

  connection.query('insert into project values ?', [data], function(err, results) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'Unable to create a new project'
      })
    }
    else {
      const sql = 'create table PRO_' + req.body.project_id +'( iteration_no int(10) auto_increment primary key, previous_department varchar(20) not null, current_department varchar(20) not null, assigned_date date not null, assigned_user int(11) not null, assigned_by int(11) not null, status varchar(20) not null, foreign key(current_department) references department(department_id), foreign key(previous_department) references department(department_id), foreign key(assigned_user) references user(user_id), foreign key(assigned_by) references user(user_id))';
      connection.query(sql, function(err, result1) {
        if(err) {
          console.log(err.sqlMessage);
          res.status(500).json({
          message: 'Unable to create a new project'
          });
        }
        else {
          res.status(200).json({
          message: 'The project has been initialized successfully'
          });
        }
      });
    }
  })
});


router.get('/forDepartment/:deptId', function(req, res, next) {
  connection.query('select * from project where current_department = ?', [req.params.deptId], function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'Unable to fetch the projects for the department',
        error: err.sqlMessage
      })
    } else {
      var length = result.length;
      if (result.length > 0) {
        res.status(200).json({
          message: 'The projects have been fetched successfully',
          projects: result,
          length: length
        })
      } else {
        res.status(200).json({
          message: 'No Projects found for this department',
          length: 0
        })
      }
    }
  })
});


router.post('/assignProject', function(req, res, next) {
  var sql = 'update project set current_department = ?, status = ?, currently_assigned_user = ? where project_id = ?';
  connection.query(sql, [req.body.department, req.body.status, req.body.manager, req.body.projectId], function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'Unable to assign the department and change the status',
        error: err.sqlMessage
      });
    } else {
       const date = new Date();
          const data = [
           [
              null,
              req.body.previousDepartment,
              req.body.department,
              date,
              req.body.manager,
              req.body.assignedBy,
              req.body.status
            ]
          ];
        sql = 'insert into pro_' + req.body.projectId + ' values ?';
        connection.query(sql, [data], function(err, results1) {
          if(err) {
            console.log(err.sqlMessage);
            res.status(500).json({
              message: 'Unable to assign the department and change the status',
              error: err.sqlMessage
            });
          } else {
            res.status(200).json({
              message: 'The project has been assigned successfully',
            });
          }
        });
    }
  })
});


module.exports = router;
