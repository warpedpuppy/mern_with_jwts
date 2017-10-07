var express = require('express'),
	config = require('./config/config');
    jwt     = require('express-jwt');

var app = module.exports = express.Router();


var jwtCheck = jwt({
  secret: config.secret
 });

app.use("/testJWT", jwtCheck);


app.post('/testJWT/getMessage', function(req, res, next){

	console.log("post call from protected routes ", req.session)
    res.status(200).json({message:"this is the test jwt message"});

});

app.post('/testJWT/isStillGood', function(req, res, next){
    console.log("post call from protected routes ", req.session)
    res.status(200).json({message:"still good, bby"});

});
