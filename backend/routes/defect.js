const express = require('express');
const router = express.Router();
const connection = require('../db-config');
const extractFile = require('../middleware/file');
const fs = require('fs');
const path = require('path');

router.get('/getCategory', (req, res, next) => {
  connection.query('select * from defect_category', function(err, result) {
    if(err) {
      res.status(500).json({
        message: 'The data for defect category was not fetched'
      })
    } else {
      res.status(200).json({
        message: 'The defect categories have been fetched successfully',
        data: result
      })
    }
  });
})

router.get('/getType', (req, res, next) => {
  connection.query('select * from defect_type', function(err, result) {
    if(err) {
      res.status(500).json({
        message: 'The data for defect type was not fetched'
      })
    } else {
      res.status(200).json({
        message: 'The defect types have been fetched successfully',
        data: result
      })
    }
  });
})

router.get('/getStatus', (req, res, next) => {
  connection.query('select * from defect_status', function(err, result) {
    if(err) {
      res.status(500).json({
        message: 'The data for defect status was not fetched'
      })
    } else {
      res.status(200).json({
        message: 'The status data has been fetched successfully',
        data: result
      })
    }
  });
})

router.post('/raiseDefect/:projectId', (req, res, next) => {
  createDefectTable(req.params.projectId, function(err, message) {
    if (err) {
      res.status(500).json({
          message: err
      })
    } else {
      iterationNo(req.params.projectId, function(err, iteration_no){
        if(err) {
          res.status(500).json({
            message: err
          })
        } else {
          const sql = "Insert into defects_" + req.params.projectId + " values ?";
          const date = new Date();
          const data = [
            [
              iteration_no,
              req.body.defect_id,
              req.body.defect_name,
              req.body.defect_category,
              req.body.defect_type,
              req.body.status,
              req.body.description,
              req.body.log_data,
              req.body.assign_department,
              req.body.assign_to,
              date,
              req.body.assign_status
            ]
          ];
          connection.query(sql, [data], function(err, result) {
            if(err) {
              console.log(err.sqlMessage);
              res.status(500).json({
                message: err.sqlMessage
              })
            } else {
              res.status(200).json({
                message: 'The defect has been raised successfully'
              });
            }
          })
        }
      })
    }
  });
})



function iterationNo (projectId, callback) {
  connection.query('select iteration_no from pro_' + projectId  + ' order by iteration_no desc limit 1', function(err, result) {
    if(err) {
      return callback(err.sqlMessage, false);
    } else {
      var iteration_no = parseInt(result[0].iteration_no);
          return callback(false, iteration_no);
      }
  })
}



function createDefectTable(projectId, callback) {
  const sql = "create table if not exists defects_" + projectId + "(iteration_no int, defect_id int auto_increment primary key, defect_name varchar(50) not null, defect_category varchar(50) not null, defect_type varchar(50) not null, status varchar(20) not null, description varchar(200) not null, log_data varchar(1000), assigned_department varchar(20), assigned_user int, date date, assign_status int not null, foreign key(iteration_no) references pro_" + projectId + "(iteration_no), foreign key(defect_category) references defect_category(category_name), foreign key(defect_type) references defect_type(type_name),  foreign key(status) references defect_status(status),  foreign key(assigned_department) references department(department_id), foreign key(assigned_user) references user(user_id))";
  connection.query(sql, function(err, result) {
    if(err) {
      return callback(err.sqlMessage, false);
    } else {
       return callback(false, 'The table has been created successfully');
    }
  });
}

router.get('/getDefects/:projectId', (req, res, next) => {
  const sql = 'select * from defects_' + req.params.projectId;
  connection.query(sql, function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: err.sqlMessage
      })
    } else {
      res.status(200).json({
        message: 'The data has been fetched successsfully',
        defects: result
      });
    }
  })
})


router.get('/getUserDefects/:projectId/:userId', (req, res, next) => {
  const sql = 'select * from defects_' + req.params.projectId + ' where assigned_user = ' + req.params.userId;
  connection.query(sql, function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: err.sqlMessage
      })
    } else {
      res.status(200).json({
        message: 'The data has been fetched successsfully',
        defects: result
      });
    }
  })
})

router.post('/assignDefect', (req, res, next) => {
  const sql = "update defects_" + req.body.projectId + " set assigned_department = '" + req.body.departmentId + "', assigned_user = " + req.body.userId + ", assign_status = 1" + " where defect_id = " + req.body.defectId;
  connection.query(sql, function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: err.sqlMessage
      });
    } else {
      res.status(200).json({
        message: 'The defect has been assigned successfully'
      })
    }
  })
})


router.post('/bulkDefects', extractFile, (req, res, next) => {
  const path = "E:/Development work/Compass/backend/defects/" + req.file.filename;
  iterationNo(req.body.projectId, function(err, iteration_no){
    if(err) {
      res.status(500).json({
        message: err
      })
    } else {
      const sql = "LOAD DATA INFILE '" + path + "' into table defects_" + req.body.projectId + " FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' IGNORE 1 ROWS (defect_name,	defect_category,	defect_type,	status,	description,	log_data) SET date = CURDATE(),	assign_status = 0, iteration_no = " + iteration_no;
      connection.query(sql, function(err, result) {
        if(err) {
          res.status(500).json({
            messsage: "Unable to raise the defects"
          });
        } else {
          fs.unlink(path, (err) => {
            if(err) {
              res.status(418).json({
                message: 'Defect file deletion failed'
              });
            } else {
              res.status(200).json({
                messsage: "The defects have been successfully raised"
              });
            }
          })
        }
      })
    }
  });
});


router.get('/templateDownload', (req, res, next) => {
  filepath = path.join(__dirname, '../templates/defect_upload_template.csv');
  res.sendFile(filepath);
})



router.get('/exportDefects/:projectId', (req, res, next) => {
  const cols = "iteration_no, defect_id, defect_name, defect_category, defect_type, status, description, ifnull(log_data, 'NULL'), ifnull(assigned_department, 'Not Assigned'), ifnull(assigned_user, 'Not Assigned'), date";
  const headers = "select 'Iteration No', 'Defect Id', 'Defect Name', 'Defect Category', 'Defect Type', 'Status', 'Description', 'Logs', 'Assigned Department', 'Assigned User', 'Date' union all";
  const path1 = "E:/Development work/Compass/backend/defects/exports/export_defects.csv";
  const sql = headers + " select " + cols + " into outfile 'E:/Development work/Compass/backend/defects/exports/export_defects.csv' FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n' FROM defects_" + req.params.projectId;
  connection.query(sql, function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message:'Unable to export the data in the table'
      });
    } else {
      filepath = path.join(__dirname, '../defects/exports/export_defects.csv');
      res.sendFile(filepath, function(err) {
        if(err) {
          console.log("Inside the else");
          console.log(err);
        } else {
            fs.unlink(path1, function(err){
              if(err) {
                console.log(err);
              }
            });
        }
      });
    }
  });
});

router.put('/closeDefect', (req, res, next) => {
  const sql = "update defects_" + req.body.projectId + " set status = 'closed' where defect_id = " + req.body.defectId;
  connection.query(sql, function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'Unable to close the defect'
      });
    } else {
      res.status(200).json({
        message: 'The defect has been successfully closed'
      })
    }
  })
})

router.delete('/deleteDefect/:projectId/:defectId', (req, res, next) => {
  const sql = "delete from defects_" + req.params.projectId +  " where defect_id = " + req.params.defectId;
  connection.query(sql, function(err, result) {
    if(err) {
      console.log(err.sqlMessage);
      res.status(500).json({
        message: 'Unable to delete the defect'
      });
    } else {
      res.status(200).json({
        message: 'The defect has been successfully deleted'
      })
    }
  })
})

module.exports = router;
