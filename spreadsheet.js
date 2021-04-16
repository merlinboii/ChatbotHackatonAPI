const GoogleSpreadsheet = require('google-spreadsheet')
// const { promisify } = require('util')
var express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

var route = require('./routes/routes')
route(app)

//================= PORT ================//
 app.listen(process.env.PORT || 80 , function () {
    console.log('App listening on port 3000!');
  })  

/*   app.listen(3000 , function () {
    console.log('App listening on port 3000!');
  }) */  

 