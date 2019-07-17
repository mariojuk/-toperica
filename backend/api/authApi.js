var express = require('express')
var router = express.Router()
var jwt = require("jwt-simple")
var User = require('../models/User')
//sve rute u api
router.post('/authenticate', function(req, res, next) { //trazi usera
	User.findOne({
		username: req.body.username
	}).select('_id username password roles').exec(function(err,user){
		if (err) throw err

		if (!user) {
			res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' })
		} else {
			if(user.password.toString() == req.body.password.toString()){
				user = user.toObject()
				delete user.password //radi sigurnosti brisemo iz objekta
				var token = jwt.encode(user, 'TopSecret') //stvaramo localstorage po toj kljucnoj rijeci
				if(user.roles.toString() == 'admin'){
					res.json({ success: true, token: 'JWT ' + token , username: user.username, isAdmin: true }) //vraca kriptirani localstorage admin
				}else{
					res.json({ success: true, token: 'JWT ' + token , username: user.username, isAdmin: false }) //vraca kriptirani localstorage sudac
				}
				
			}else{
				res.status(401).json({ success: false, msg: 'Authentication failed. Wrong password.'})
			}
		}
	})
})

module.exports = router