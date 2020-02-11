const multer = require('multer');

const MIME_TYPE_MAP = {
  'application/pdf': 'pdf',
  'application/vnd.ms-excel': 'csv'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = MIME_TYPE_MAP[file.mimetype];
    var path;
    let error = new Error("Invalid Mime Type");
    if (type == 'pdf') {
      path = "backend/documents";
      error = null;
    } else if(type == 'csv') {
      path = "backend/defects";
      error = null;
    }
    cb(error, path);
  },
  filename: (req, file, cb) => {
    const name = req.body.projectId.toLowerCase() + '-' + req.body.type.toLowerCase();
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});


module.exports = multer({ storage: storage }).single("file");
