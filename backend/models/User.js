var mongoose = require('mongoose')

var Schema = mongoose.Schema
var UserSchema = new Schema({
	username: String,
	password: {
		type: String,
		select: false 
	},
	roles: {
		type: [{ type: String, enum: ['user', 'admin']}],
		default: ['user']
	}
},{ timestamps: true })

module.exports = mongoose.model('User', UserSchema)
