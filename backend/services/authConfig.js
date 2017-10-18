var passport = require('passport') 
var passportJWT = require('passport-jwt') 
var User = require('../models/User')
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt	

module.exports = function() {
	var opts = {}
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
	opts.secretOrKey = 'TopSecret'
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload._id}, function(err, user) {
        if (err) {
            return done(err, false)
        }
        if (user) {
            return done(null, user)
        } else {
            return done(null, false)
        }
    	})
	}))
}
