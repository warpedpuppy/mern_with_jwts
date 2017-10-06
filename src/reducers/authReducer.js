"use strict"
import { 
  QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE
} from '../actions/authActions'

function authReducer(state = {
    isFetching: false,
    isAuthenticated: false,
    currentMember: "",
    message:"" }, action) {
	switch(action.type){

		case "TEST_JWT":
			let obj3 = Object.assign({}, state, {
	        message: action.payload.message
	      	})
			return obj3

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