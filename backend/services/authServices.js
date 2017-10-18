var passport = require('passport')

var passportAuthenticator = passport.authenticate('jwt', { session: false })
var fakeAlwaysTrueAuthenticator = (req, res, next) => next()

var ensure = true
	? passportAuthenticator 
	: fakeAlwaysTrueAuthenticator

module.exports = {
	ensure
}