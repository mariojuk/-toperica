module.exports = function(app){

	app.use(function(req, res, next){ 

		res.ok = function(data){
			res.status(200).json(data)
		}

		res.noAuth = function(){
			res.status(401).json()
		}

		res.forbidden = function(){
			res.status(403).json()
		}

		res.error = function(err){
			res.status(400).json(err)
		}

		res.notFound = function(){
			res.sendStatus(404)
		}
		
		next()
	})

}