var express = require('express'),
	config = require('./config/config');
    jwt     = require('express-jwt');

var app = module.exports = express.Router();


var jwtCheck = jwt({
  secret: config.secret
 });
// 

// app.use('/api/protected', jwtCheck);

// app.get('/api/protected/random-quote', function(req, res) {

//   res.status(200).send(quoter.getRandomOne());
// });


//var auth = jwt({secret: config.secret, userProperty: 'payload'});


app.use("/testJWT", jwtCheck);

app.get('/testJWT/getMessage', function(req, res, next){
	console.log("get call from protected routes ", req.body)
    res.status(200).json({message:"this is the test jwt message"});

});


app.post('/testJWT/getMessage', function(req, res, next){
	console.log("post call from protected routes ", req.body)
    res.status(200).json({message:"this is the test jwt message"});

});
