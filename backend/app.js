const express   = require("express");
const app       = express();
const userRoutes = require('./routes/user');
const deptRoutes = require('./routes/department');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/project');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Access-Control-Request-Method, Accept, Authorization");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.use('/api/user', userRoutes);
app.use('/api/dept', deptRoutes);
app.use('/api/project', projectRoutes);

module.exports = app;
