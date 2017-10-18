var User = require('../models/User')
var _ = require('lodash')
var listOfAdmin = ['admin01', 'admin02', 'admin03', 'admin04', 'admin05', 'admin06', 'admin07', 'admin08']
var adminPass = ['12345', '123456']

function createAdmin(){
	var username = _.sample(listOfAdmin)
	var password = _.sample(adminPass)
	User.find({username: username}).then(function(user){
		if(user.length > 0){
			user.remove()
			createAdminFunction(username, password)
		}else{
			createAdminFunction(username, password)
		}
	})
}

module.exports = {
	createAdmin
}

var createAdminFunction = function(username, password){
	var newUser = new User({
		username: username,
		password: password,
		roles : 'admin'
	})
	newUser.save(function(err,done){
		if(err){
			console.log(err)
		}
	})
}