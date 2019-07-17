var passport = require('passport') 
var passportJWT = require('passport-jwt') 
var User = require('../models/User')
var JwtStrategy = require('passport-jwt').Strategy,
	ExtractJwt = require('passport-jwt').ExtractJwt	
//poziva query
module.exports = function() {  //jesmo logirani na netu
	var opts = {}
	opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
	opts.secretOrKey = 'TopSecret'
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) { //enkripcija dekripcija po tajnoj rijeci
    User.findById(jwt_payload._id, function(err, user) {  //trazi u bazu po ID usera
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
