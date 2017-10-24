angular.module('SportApp').service('userService', [ function(){
	var currentUser = null

	return {
		getUser : function(){
			return currentUser
		},
		setUser : function(user){
			currentUser = user
		}
	}
}])
	