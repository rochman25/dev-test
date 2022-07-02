const express = require("express")
const path = require('path')

const app = express();


 
//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');

app.use('/',express.static(__dirname + '/public'));

app.get("/", (req, res) => {
  res.render('index');
});

app.listen(5000, () => {
  console.log('Listening on port ' + 5000);
});