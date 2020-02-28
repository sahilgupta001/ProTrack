const express = require('express');
const router = express.Router();
const async = require('async');
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
  const sql = 'select * from ??';
  const projectId = "pro_" + req.params.projectId;
  connection.query('select * from project where project_id = ?', [req.params.projectId], function(err, projectInfo) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'Unable to fetch the data',
        error: err.sqlMessage
      });
    } else {
      connection.query(sql, [projectId], function(err, iterationInfo) {
        if(err) {
          console.log(err.sqlMessage);
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

router.get('/managerProjects/:userId', function(req, res, next) {
  connection.query('select * from project where currently_assigned_user = ?', [req.params.userId], function(err, projects) {
    if(err) {
      res.status(500).json({
        message: 'The projects were not fetched'
      });
    }
    else {
      res.status(200).json({
        message: 'Projects are fetched successfully',
        projects: projects
      })
    }
  })
});

router.get('/userProjects/:userId', function(req, res, next) {
  connection.query('select project_id from project', function(err, projects) {
    if(err) {
      res.status(500).json({
        message: "The projectsId's were not fetched"
      });
    }
    else {
      fetchProjects(projects, req.params.userId, function(err, data) {
        if(err) {
          res.status(500).json({
            message: err
          })
        } else {
          console.log(data);
          res.status(200).json({
            message: 'Projects are fetched successfully',
            projects: data[0]
          })
        }
      });
    }
  })
});

router.post('/assignUser', (req, res, next) => {
  iterationNo(req.body.projectId, function(err, iteration_no) {
    if(err) {
      res.status(500).json({
        message: err
      })
    } else {
      const data = [
      [
        null,
        iteration_no,
        req.body.userId
      ]
        ];
      const sql = 'insert into ?? values ?'
      const table = 'users_' + req.body.projectId;
      connection.query(sql, [table, data], function(err, result) {
        if(err) {
          console.log(err.sqlMessage);
        } else {
          res.status(200).json({
            message: 'The user has been successfully assigned'
          })
        }
      })
    }
  });
});

router.get('/projectUserData/:deptId/:projectId', function(req, res, next) {
  const sql = 'create table if not exists ??(sno int primary key auto_increment, iteration_no int not null, user_id int not null, foreign key(iteration_no) references ??(iteration_no), foreign key(user_id) references user(user_id))';
  const table = 'users_' + req.params.projectId;
  const table1 = 'pro_' + req.params.projectId;
  connection.query(sql, [table, table1], function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'Unable to create the table'
      })
    } else {
      const sql1 = "select t1.user_id, t1.fname, t1.lname, t1.email_id, t1.phone_no, t1.role_id from user t1 left join ?? t2 on t2.user_id = t1.user_id where t2.user_id is null and t1.department_id = ?";
      connection.query(sql1, [table, req.params.deptId], function(err, result) {
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
    }
  });
});


router.get('/AssignedUserData/:deptId/:projectId', function(req, res, next) {
  const sql = 'create table if not exists ??(sno int primary key auto_increment, iteration_no int not null, user_id int not null, foreign key(iteration_no) references ??(iteration_no), foreign key(user_id) references user(user_id))';
  const table = 'users_' + req.params.projectId;
  const table1 = 'pro_' + req.params.projectId;
  connection.query(sql, [table, table1], function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'Unable to create the table'
      })
    } else {
      const sql1 = "select t1.user_id, t1.fname, t1.lname, t1.email_id, t1.phone_no, t1.role_id from user t1, ?? t2 where t2.user_id = t1.user_id";
      connection.query(sql1, [table], function(err, result) {
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
    }
  });
});


function iterationNo (projectId, callback) {
  const table = 'pro_' + projectId;
  connection.query('select iteration_no from ?? order by iteration_no desc limit 1', [table], function(err, result) {
    if(err) {
      return callback(err.sqlMessage, false);
    } else {
      var iteration_no = parseInt(result[0].iteration_no);
      return callback(false, iteration_no);
    }
  })
}


function fetchProjects (projects, userId, callback) {
  var projectIds = [];
    async.forEach(projects, function(row, cb) {
      const sql = 'create table if not exists ??(sno int primary key auto_increment, iteration_no int not null, user_id int not null, foreign key(iteration_no) references ??(iteration_no), foreign key(user_id) references user(user_id))';
      let table =  'users_' + row.project_id;
      let table1 =  'pro_' + row.project_id;
      connection.query(sql, [table, table1], function(err, result) {
        if(err) {
          cb(err);
        } else {
          console.log("Table created");
          const sql1 = "select distinct t1.project_id, t1.project_name, t1.client, t1.initial_department_id, t1.start_date, t1.status, t1.current_department, t1.currently_assigned_user from project t1, ?? t2 where t1.project_id = ? and (select user_id from ?? where user_id = ?)";
          connection.query(sql1, [table, row.project_id, table, userId], function(err, result1) {
            if(err) {
              cb(err);
            } else {
              if(result1.length > 0) {
                projectIds.push(result1);
                cb();
              } else {
                cb();
              }
            }
          });
        }
      });
    }, function(err, result) {
      console.log("Calling callback");
      return callback(false, projectIds);
    });
}

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
      const sql = 'create table ??( iteration_no int(10) auto_increment primary key, previous_department varchar(20) not null, current_department varchar(20) not null, assigned_date date not null, assigned_user int(11) not null, assigned_by int(11) not null, status varchar(20) not null, foreign key(current_department) references department(department_id), foreign key(previous_department) references department(department_id), foreign key(assigned_user) references user(user_id), foreign key(assigned_by) references user(user_id))';
      const table = 'PRO_' + req.body.project_id;
      connection.query(sql, [table], function(err, result1) {
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
        sql = 'insert into ?? values ?';
        const table = 'pro_' + req.body.projectId;
        connection.query(sql, [table, data], function(err, results1) {
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
