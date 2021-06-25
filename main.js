var express = require('express');
var app = express();

var controller = require('./controller/toDoController');

app.set('view engine', 'ejs');  //template engine

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/assets' , express.static('assets'));

controller(app);//fire the controller

// var port = 3000;

// app.listen(port);//listen to port

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);


console.log('starting server now ..');
