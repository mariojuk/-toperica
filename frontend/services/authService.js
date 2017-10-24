angular.module('SportApp').service('AuthService', ['$http', 'userService', function($http, userService) {
	var LOCAL_TOKEN_KEY = 'sportApp'
	var isAuthenticated = false
	var authToken

	function loadUserCredentials() {
		var token = window.localStorage.getItem(LOCAL_TOKEN_KEY)
		if (token) {
			useCredentials(token)
		}   
	}

	function storeUserCredentials(token) {
		window.localStorage.setItem(LOCAL_TOKEN_KEY, token)
		useCredentials(token)
	}

	function useCredentials(token) {
		isAuthenticated = true
		authToken = token

		var currentUser = parseJwt(token)
		userService.setUser(currentUser)
		$http.defaults.headers.common.Authorization = authToken
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
		$http.defaults.headers.common.Authorization = authToken
		return currentUser
	}

	function parseJwt (token) {
		var base64Url = token.split('.')[1]
		var base64 = base64Url.replace('-', '+').replace('_', '/')
		return JSON.parse(window.atob(base64))
	}

	var login = function(user) {
		return $http.post('api/login/authenticate', user).then(function(result) {
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
