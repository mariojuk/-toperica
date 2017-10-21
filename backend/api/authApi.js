var express = require('express')
var router = express.Router()
var jwt = require("jwt-simple")
var User = require('../models/User')

router.post('/authenticate', function(req, res, next) {
	User.findOne({
		username: req.body.username
	}).select('_id username password roles').exec(function(err,user){
		if (err) throw err

		if (!user) {
			res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' })
		} else {
			if(user.password.toString() == req.body.password.toString()){
				user = user.toObject()
				delete user.password
				var token = jwt.encode(user, 'TopSecret')
				if(user.roles.toString() == 'admin'){
					res.json({ success: true, token: 'JWT ' + token , username: user.username, isAdmin: true })
				}else{
					res.json({ success: true, token: 'JWT ' + token , username: user.username, isAdmin: false })
				}
				
			}else{
				res.status(401).json({ success: false, msg: 'Authentication failed. Wrong password.'})
			}
		}
	})
})

module.exports = router