var express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
var mongoose = require('mongoose')
var app = express()
var config = require('./backend/config/appConfig')
var services = require('./backend/services/createAdmin')
var authConfig = require('./backend/services/authConfig')
var responseMW = require('./backend/config/responseMiddleware')
mongoose.connect(config.database,function(err){
	if(err){
		console.log(err)
	}else{
		console.log('Connected on database !!!')
	}
})

authConfig()
responseMW(app)
services.createAdmin()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.use(express.static(__dirname + '/frontend'))

app.use('/api/login', require('./backend/api/authApi'))
app.use('/api/create', require('./backend/api/create'))

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Methods', 'POST, PUT, OPTIONS, DELETE, GET')
	res.header('Access-Control-Allow-Origin', 'http://localhost')
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	next()
})

app.get('*', function(req,res){
	res.sendFile(__dirname + '/frontend/index.html')
})

app.listen(config.port, function(err){
	if(err){
		console.log(err)
	}else{
		console.log('Listening on port 3000')
	}
})