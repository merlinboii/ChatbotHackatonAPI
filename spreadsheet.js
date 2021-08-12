var express = require('express');
var bodyParser = require('body-parser');
const app = express();

require('dotenv').config()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

var route = require('./routes/routes')
route(app)

 app.listen(process.env.PORT || 80 , function () {
    console.log('App listening on port 3000!');
  })  

 