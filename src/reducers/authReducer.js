"use strict"

function authReducer(state = {
    isFetching: false,
    isAuthenticated: false,
    currentMember: "" }, action) {
	switch(action.type){

		case "LOGIN_USER":
			let obj = Object.assign({}, state, {
	        isFetching: false,
	        isAuthenticated: true,
	        currentMember: action.currentMember,
	        errorMessage: ''
	      	})
			return obj

		case "LOGOUT_SUCCESS":
	      return Object.assign({}, state, {
	        isFetching: true,
	        isAuthenticated: false,
	        currentMember: ""
	      })

	      case "REGISTER_USER":
	      	console.log("FROM authReducer = ", action)
			return Object.assign({}, state, {
	        isFetching: false,
	        isAuthenticated: true,
	        currentMember: action.payload.username,
	        errorMessage: ''
	      	})
		break;


	}
	return state;
}
export default authReducer;