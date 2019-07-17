angular.module('SportApp').service('AuthService', ['$http','$state', 'userService', function($http, $state, userService) {
	var LOCAL_TOKEN_KEY = 'sportApp'
	var isAuthenticated = false
	var authToken

	function loadUserCredentials() {
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY)
		if (token) {
			useCredentials(token)
		}   
		else{
			$state.go('login')
		}
	}

	function storeUserCredentials(token) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token) //postavlja u browseru local storage taj token
		useCredentials(token)
	}

	function useCredentials(token) {
		isAuthenticated = true
		authToken = token

		var currentUser = parseJwt(token)
		userService.setUser(currentUser)
		$http.defaults.headers.common.Authorization = authToken //da bi znali jesmo prijavljeni ili nismo na backendu
	}

	function destroyUserCredentials() {
		authToken = undefined
		isAuthenticated = false
		$http.defaults.headers.common.Authorization = undefined
		window.localStorage.removeItem(LOCAL_TOKEN_KEY)
		userService.setUser({})
	}

	function getCurrentUser(token){
		var currentUser = parseJwt(authToken)
		return currentUser
	}

	function parseJwt (token) { // uzima token
		if(token == undefined) {
			$state.go('login')
		}else{ //stavar usera i pristupa
			var base64Url = token.split('.')[1]
			var base64 = base64Url.replace('-', '+').replace('_', '/')
			return JSON.parse(window.atob(base64))
		}
	}

	var login = function(user) {
		return $http.post('api/login/authenticate', user).then(function(result) { //imamo token sucess i admin je nije
			storeUserCredentials(result.data.token)
			return result
		})
	}

	var logout = function() {
		destroyUserCredentials()
	}

	loadUserCredentials()

	return {
		login: login,
		logout: logout,
		getCurrentUser: getCurrentUser,
		storeUserCredentials: storeUserCredentials,
		isAuthenticated: function() { return isAuthenticated },
	}
}])
