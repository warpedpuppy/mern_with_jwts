var express = require('express'),
    _       = require('lodash'),
    config  = require('./config/config'),
    jsonwebtoken     = require('jsonwebtoken'),
    passport = require('passport'),
    app = module.exports = express.Router(),
    User = require("./models/users.js");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('./config/passport');

function createToken(user) {
  console.log("secret = ", config.secret)
  //return jsonwebtoken.sign({data:user.username,exp: Math.floor(Date.now() / 1000) + (60 * 60)}, config.secret);
  let asdf = jsonwebtoken.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*5 });
  //console.log("THIS IS THE TOKEN = ", asdf);

  //let decoded = jsonwebtoken.verify(asdf, config.secret, function(err, decoded){
    //console.log("THIS IS THE TOKEN VERIFIED 2= ", decoded);
 // });


   return asdf;
}

app.get('/users', function(req, res){
  console.log("GET USERS FROM API SERVER")

  User.find(function(err, users){
    if(err){
      throw err;
    }
    res.json(users);
  })
})

app.post('/login', function(req, res, next){
  console.log("LOGIN API CALL", req.body);



  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }
    if(user){

      let currentUser = {};
      currentUser.id_token = createToken(req.body);
      currentUser.username = req.body.username;
      req.session.currentUser = currentUser;
      req.session.save(function(err){
        if(err){
          console.log('# API POST currentUser SESSION: ', err);
        }
        //res.json(req.session.currentUser);
        return res.status(201).json(req.session.currentUser);
      })

       //return res.status(201).json({id_token: currentUser.id_token});

    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

app.get('/retrieveToken', function(req, res, next){
  console.log("req body", req.body)
  console.log(req.session.currentUser);
  console.log("req body", req.body)
  return res.status(201).json(req.session.currentUser);
})


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