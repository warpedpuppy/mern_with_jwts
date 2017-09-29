var express = require('express');
var path = require('path');
var cors = require('cors');
const config = require('./config/config');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv          = require('dotenv');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var  http            = require('http');

var app = express();
dotenv.load();
//app.set('view engine', 'jade');
//app.set('views', path.join(__dirname, 'views'));

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
//app.use(cookieParser());

var mongoose = require('mongoose');

//LOCAL
mongoose.connect('mongodb://localhost:27017/users20170922', { useMongoClient: true });
//REMOTE
//mongoose.connect('mongodb://testUser:test@ds147034.mlab.com:47034/warpedpuppy_test', { useMongoClient: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, '# MongoDB - connection error'))

app.use(function(err, req, res, next) {

  if (err.name === 'StatusError') {
    res.send(err.status, err.message);
  } else {
    next(err);
  }
});

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
  app.use(errorhandler())
}
app.use(session({
  secret: config.secret, 
  saveUnitialized: false,
  resave: false,
  cookie: {maxAge: 1000*60*60*24*2},
  store: new MongoStore({mongooseConnection: db, ttl:5*60})
}))

app.use(require('./protected-routes'));
app.use(require('./unprotected-routes'));
//SESSION!!!
var port = process.env.PORT || 3001;
http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});

// app.listen(3001, function(err){
//   if(err)return console.log(err);
//   console.log("api server listening on port 3001. . . . . .")
// })









