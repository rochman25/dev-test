const express = require("express")
const path = require('path')
const app = express();
const router = require('./src/routes/index');
var hbs = require("hbs")

hbs.registerHelper("equal", require("handlebars-helper-equal"))
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');


app.use('/',express.static(__dirname + '/public'));

app.use('/',router);

app.listen(5000, () => {
  console.log('Listening on port ' + 5000);
});