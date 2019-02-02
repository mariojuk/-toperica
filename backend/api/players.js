var express = require('express')
var router = express.Router()
var auth = require('../services/authServices')
const playersQueris = require('../queries/players-queris')

var checkIsAdmin = function(req, res, next){
	var roles = req.user.roles
	if(roles == 'admin'){next()}
	else{res.status(400).json({err: 'You dont have permission '})}
}

router
	.delete('/:id', auth.ensure, checkIsAdmin, function(req, res, next){
        playersQueris.deletePlayer(req.params.id)
            .then(async ()=>{
                const response = await playersQueris.getAllPlayers()
                res.ok(response)
            })
            .catch(err => res.error(err))
	})

module.exports = router