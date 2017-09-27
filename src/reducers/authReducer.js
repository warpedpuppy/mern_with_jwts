"use strict"

function authReducer(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
	switch(action.type){

		case "LOGIN_USER":
			let obj = Object.assign({}, state, {
	        isFetching: false,
	        isAuthenticated: true,
	        errorMessage: ''
	      	})
			return obj
			
		case "LOGOUT_SUCCESS":
	      return Object.assign({}, state, {
	        isFetching: true,
	        isAuthenticated: false
	      })

	      case "REGISTER_USER":
			var obj = {users:[...state.users, action.payload]}
			return obj;
		break;


	}
	return state;
}
export default authReducer;