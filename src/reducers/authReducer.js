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
      	console.log("AUTH REDUCER", obj)
		return obj
		break;


	}
	return state;
}
export default authReducer;