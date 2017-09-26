"use strict"
import axios from 'axios';

//POST
export function getUsers(){
	console.log('GET_USERS ACTION FIRED')
	return function(dispatch){
		axios.get("/api/users")
		.then(function(response){
			dispatch({type:"GET_USERS", payload:response.data})
		})
		.catch(function(err){
			dispatch({type:"GET_USERS_REJECTED", payload:err})
		})
	}
}


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
	console.log('LOGIN_USER ACTION FIRED', user)
	return function(dispatch){
		axios.post("/api/login", user)
		.then(function(response){

			console.log("LOGIN USER ACTION = ", response.data);

			localStorage.setItem('id_token', response.data.token);

			dispatch(receiveLogin(response.data))

			//dispatch({type:"LOGIN_USER", payload:response.data})
		})
		.catch(function(err){
			dispatch({type:"LOGIN_USER_REJECTED", payload:"there was an error posting"})
		})
	}
}














