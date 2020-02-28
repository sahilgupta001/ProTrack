var express = require('express');
var router = express.Router();
var connection = require('../db-config');
const extractFile = require('../middleware/file');
const fs = require('fs');
const path = require('path');

router.post('/', extractFile, (req, res, next) => {
  const sql = 'create table if not exists ??(iteration_no int primary key, srs varchar(3000), srs_upload_date varchar(100), srs_description varchar(100), srs_upload_by int, installation_guide varchar(3000), installation_guide_upload_date varchar(100), installation_guide_description varchar(100), installation_guide_upload_by int, test_plan varchar(3000), test_plan_upload_date varchar(100), test_plan_description varchar(100), test_plan_upload_by int, document4 varchar(3000), document4_type varchar(50), document4_upload_date varchar(100), document4_description varchar(100), document4_upload_by int, document5 varchar(3000), document5_type varchar(50), document5_upload_date varchar(100), document5_description varchar(100), document5_upload_by int, foreign key(iteration_no) references ??(iteration_no), foreign key(srs_upload_by) references user(user_id), foreign key(installation_guide_upload_by) references user(user_id), foreign key(test_plan_upload_by) references user(user_id), foreign key(document4_upload_by) references user(user_id), foreign key(document5_upload_by) references user(user_id))';
  const table = 'documents_' + req.body.projectId;
  const table1 = 'pro_' + req.body.projectId;
  connection.query(sql, [table, table1], function(err, result) {
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
          var query = "update ?? set ?? = ?, ?? = ?, ?? = ?, ?? = ? where iteration_no = ?";
          const description = req.body.type + "_description";
          const upload_date = req.body.type + "_description";
          const upload_by = req.body.type + "_description";
          connection.query(query, [table, req.body.type, path, description, req.body.description, upload_date, date, upload_by, req.body.userId, iteration_no], function(err, result) {
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
  const table = 'pro_' + projectId;
  connection.query('select iteration_no from ?? order by iteration_no desc limit 1', [table], function(err, result) {
    if(err) {
      return callback(err.sqlMessage, false);
    } else {
      var iteration_no = parseInt(result[0].iteration_no);
      const table1 = 'documents_' + projectId;
      connection.query('insert ignore into ??(iteration_no) values (?)', [table1, iteration_no], function(err, result) {
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
      const table = "documents_" + req.params.projectId;
      const iterationNo = iteration_no - 1;
      const sql = "select * from ?? where iteration_no = ?";
      connection.query(sql, [table, iterationNo], function(err, result) {
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
      const sql = 'select ?? from ?? where iteration_no = ?';
      const table = 'documents_' + req.params.projectId;
      const iterationNo = iteration_no - 1;
      connection.query(sql, [req.params.type, table, iterationNo], function(err, result) {
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
