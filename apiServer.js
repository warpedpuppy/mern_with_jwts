var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var logger = require('morgan');


var app = express();

var Users = require("./models/users.js")


// view engine setup
app.set('view engine', 'jade');
 app.set('views', path.join(__dirname, 'views'));



//THIS REPLACES THE TWO LINES ABOVE




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



// //APIS
var mongoose = require('mongoose');

//LOCAL
mongoose.connect('mongodb://localhost:27017/users20170922', { useMongoClient: true });
//REMOTE
//mongoose.connect('mongodb://testUser:test@ds147034.mlab.com:47034/warpedpuppy_test', { useMongoClient: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error'))


//SESSION!!!
app.use(session({
  secret: 'mySecret', 
  saveUnitialized: false,
  resave: false,
  cookie: {maxAge: 1000*60*60*24*2},
  store: new MongoStore({mongooseConnection: db, ttl:2*24*60*60})
}))
app.get('/users', function(req, res){
  console.log("GET USERS")

  Users.find(function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  })

})



// //END APIS
app.listen(3001, function(err){
  if(err)return console.log(err);
  console.log("api server listening on port 3001. . . . . .")
})








