module.exports = {  //pristup    config postavke
	'database': 'mongodb://admin:admin@ds121965.mlab.com:21965/sportapp', //url mlaba
	'port': process.env.PORT || 3000,
	'database_local': 'mongodb://127.0.0.1:27017/stoperica' //lokalno baza more i izbrisati
}