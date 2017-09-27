"use strict"
import axios from 'axios';

export function registerUsers(user){
	console.log('REGISTER_USER ACTION FIRED', user)
	return function(dispatch){
		axios.post("/api/register", user)
		.then(function(response){
			dispatch({type:"REGISTER_USER", payload:response.data})
		})
		.catch(function(err){
			dispatch({type:"REGISTER_USER_REJECTED", payload:"there was an error posting"})
		})
	}
}


function receiveLogin(user) {
  return {
    type: "LOGIN_USER",
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

export function loginUser(user){

	return function(dispatch){
		axios.post("/api/login", user)
		.then(function(response){

			console.log("LOGIN USER ACTION = ", response.data);

			localStorage.setItem('id_token', response.data.token);

			dispatch(receiveLogin(response.data))

			
		})
		.catch(function(err){
			dispatch({type:"LOGIN_USER_REJECTED", payload:"there was an error posting"})
		})
	}
}



function requestLogout() {
  return {
    type: 'LOGOUT_REQUEST',
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: 'LOGOUT_SUCCESS',
    isFetching: false,
    isAuthenticated: false
  }
}

export function logout(){
	return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
  }
}




