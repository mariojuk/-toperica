var express = require('express')
var router = express.Router()
var auth = require('../services/authServices')
var passport = require('passport')

router
	.get("/secret", auth.ensure, function(req, res){
  		res.json("Success! You can not see this without a token");
	})


module.exports = router