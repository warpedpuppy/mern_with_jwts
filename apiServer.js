var express = require('express');
var path = require('path');
var jwt = require('express-jwt');
var jwt2 = require('jsonwebtoken');
var passport = require('passport');
var _ = require('lodash');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var logger = require('morgan');

var User = require("./models/users.js")
require('./config/passport');
var app = express();

//var User = mongoose.model('User');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

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
  console.log("GET USERS FROM API SERVER")

  User.find(function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  })
})

let config = require('./config/config');
function createToken(user) {
  return jwt2.sign(_.omit(user, 'password'), config.secret, { expiresInMinutes: 60*5 });
}

app.post('/login', function(req, res, next){
  console.log("LOGIN API CALL");
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }
    if(user){
      return res.json({token: user.generateJWT()});

    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});





app.post('/register', function(req, res, next){
  
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;
  console.log("FROM WITHIN API SERVER = ", user.username)

  user.setPassword(req.body.password)

  user.save(function (err, user){
    if(err){return next(err); }
     console.log("FROM WITHIN API SERVER = ", {username:user.username, token: user.generateJWT()})
    return res.json({username:user.username, token: user.generateJWT()})
  });
});



// //END APIS
app.listen(3001, function(err){
  if(err)return console.log(err);
  console.log("api server listening on port 3001. . . . . .")
})









