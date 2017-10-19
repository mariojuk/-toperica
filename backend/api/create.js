var express = require('express')
var router = express.Router()
var auth = require('../services/authServices')
var cq = require('../queries/createQueries')

var checkIsAdmin = function(req, res, next){
	var roles = req.user.roles
	if(roles == 'admin'){next()}
	else{res.status(400).json({err: 'You dont have permission !!!'})}
}

router
	.post('/referee', auth.ensure, checkIsAdmin, function(req, res, next){
  		cq.createReferee(req.body)
  			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.post('/player', auth.ensure, checkIsAdmin, function(req, res, next){
  		cq.createPlayer(req.body)
  			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.post('/game', auth.ensure, checkIsAdmin, function(req, res, next){
  		cq.createGame(req.body)
  			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.post('/game/:id/finalScore', auth.ensure, function(req, res, next){
  		cq.updateFinalScore(req.params.id, req.body.finalScore)
  			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/game/:id', auth.ensure, function(req, res, next){
		cq.getGameInfo(req.params.id)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/players', auth.ensure, checkIsAdmin, function(req, res, next){
		cq.getAllPlayers(req.query.sport)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

	.get('/referees', auth.ensure, checkIsAdmin, function(req, res, next){
		cq.getAllReferees(req.query.sport)
			.then(data => res.ok(data))
			.catch(err => res.error(err))
	})

module.exports = router