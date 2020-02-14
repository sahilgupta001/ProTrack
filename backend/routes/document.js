var express = require('express');
var router = express.Router();
var connection = require('../db-config');
const extractFile = require('../middleware/file');
const fs = require('fs');
const path = require('path');

router.post('/', extractFile, (req, res, next) => {
  const sql = 'create table if not exists documents_' + req.body.projectId + '(iteration_no int primary key, srs varchar(3000), srs_upload_date varchar(100), srs_description varchar(100), srs_upload_by int, installation_guide varchar(3000), installation_guide_upload_date varchar(100), installation_guide_description varchar(100), installation_guide_upload_by int, test_plan varchar(3000), test_plan_upload_date varchar(100), test_plan_description varchar(100), test_plan_upload_by int, document4 varchar(3000), document4_type varchar(50), document4_upload_date varchar(100), document4_description varchar(100), document4_upload_by int, document5 varchar(3000), document5_type varchar(50), document5_upload_date varchar(100), document5_description varchar(100), document5_upload_by int, foreign key(iteration_no) references pro_' + req.body.projectId + '(iteration_no), foreign key(srs_upload_by) references user(user_id), foreign key(installation_guide_upload_by) references user(user_id), foreign key(test_plan_upload_by) references user(user_id), foreign key(document4_upload_by) references user(user_id), foreign key(document5_upload_by) references user(user_id))';
  connection.query(sql, function(err, result) {
    if (err) {
      res.status(500).json({
        message: err.sqlMessage
      });
    } else {
      const url = req.protocol + '://' + req.get("host");
      iterationNo(req.body.projectId, function(err, iteration_no) {
        if(err) {
          res.status(500).json({
            message: err
          })
        } else {
          const date = new Date();
          const path = req.file.filename;
          // const path = url + "/documents/" + req.file.filename;
          var query = 'update documents_' + req.body.projectId + ' set ' + req.body.type + " = '" + path + "', " + req.body.type + "_description = '" + req.body.description + "', " +  req.body.type + "_upload_date = '" + date + "', " + req.body.type + '_upload_by = ' + req.body.userId + ' where iteration_no = ' + iteration_no;
          connection.query(query, function(err, result) {
            if (err) {
            console.log(err.sqlMessage);
              res.status(500).json({
                message: err.sqlMessage
            });
            } else {
              res.status(200).json({
                message: "Upload Successfull"
              });
            }
          })
        }
      });
    }
  })
});



function iterationNo (projectId, callback) {
  connection.query('select iteration_no from pro_' + projectId  + ' order by iteration_no desc limit 1', function(err, result) {
    if(err) {
      return callback(err.sqlMessage, false);
    } else {
      var iteration_no = parseInt(result[0].iteration_no);
      connection.query('insert ignore into documents_' + projectId + '(iteration_no) values (?)', [iteration_no], function(err, result) {
        if (err) {
          console.log(err.sqlMessage);
          return callback(err.sqlMessage, false);
        }
        else {
          return callback(false, iteration_no);
        }
      })
    }
  })
}

router.get('/getDocuments/:projectId', (req, res, next) => {
  iterationNo(req.params.projectId, function(err, iteration_no) {
    if(err) {
      res.status(500).json({
        message: err
      })
    } else {
      const sql = "select * from documents_" + req.params.projectId + " where iteration_no = " + (iteration_no - 1);
      connection.query(sql, function(err, result) {
        if(err) {
          res.status(500).json({
            message: 'Unable to fetch the document data'
          })
        } else {
            if (result.length > 0) {
              var srs;
              var installation_guide;
              var test_plan;
              var document4;
              var document5;
              if (result[0].srs)
                srs = {
                  'type': 'SRS',
                  'upload_date': result[0].srs_upload_date,
                  'description': result[0].srs_description,
                  'upload_by': result[0].srs_upload_by
                };
              if (result[0].installation_guide)
                installation_guide = {
                  'type': 'Installation Guide',
                  'upload_date': result[0].installation_guide_upload_date,
                  'description': result[0].installation_guide_description,
                  'upload_by': result[0].installation_guide_upload_by
                };
              if (result[0].test_plan)
                test_plan = {
                  'type': 'Test Plan',
                  'upload_date': result[0].test_plan_upload_date,
                  'description': result[0].test_plan_description,
                  'upload_by': result[0].test_plan_upload_by
                };
              if (result[0].document4)
                document4 = {
                  'type': 'Extra',
                  'upload_date': result[0].document4_upload_date,
                  'description': result[0].document4_description,
                  'upload_by': result[0].document4_upload_by
                };
              if (result[0].document5)
                document5 = {
                  'type': 'Extra',
                  'upload_date': result[0].document5_upload_date,
                  'description': result[0].document5_description,
                  'upload_by': result[0].document5_upload_by
                };
              res.status(200).json({
                message: 'The document data has been fetched successfully',
                srs: srs,
                installation_guide: installation_guide,
                test_plan: test_plan,
                document4: document4,
                document5: document5
              });
            } else {
              res.status(500).json({
                message: 'Database Inconsistent'
              });
            }
          }
      })
    }
  })
})


router.get('/download/:projectId/:type', (req, res, next) => {
  iterationNo(req.params.projectId, function(err, iteration_no) {
    if(err) {
      res.status(500).json({
        message: err
      })
    } else {
      const sql = 'select ' + req.params.type + ' from documents_' + req.params.projectId + ' where iteration_no = ' + (iteration_no - 1);
      connection.query(sql, function(err, result) {
        if(err) {
          res.status(500).json({
            message: 'Unable to process the download'
          })
        } else {
          const filename = JSON.stringify(result[0]).split("\"");
          filepath = path.join(__dirname, '../documents/' + filename[3]);
          res.sendFile(filepath);
        }
      })
    }
  })
})

module.exports = router;
