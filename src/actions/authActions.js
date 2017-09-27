"use strict"
import axios from 'axios';
import {getUsers} from './userActions';


export function registerUsers(user){
	
	return function(dispatch){
		axios.post("/api/register", user)
		.then(function(response){
			
			localStorage.setItem('id_token', response.data.token);
			localStorage.setItem('username', response.data.username);
			dispatch({type:"REGISTER_USER", payload:response.data});
			dispatch(getUsers());
		})
		.catch(function(err){
			dispatch({type:"REGISTER_USER_REJECTED", payload:"there was an error posting"})
		})
	}
}



function receiveLogin(token, username) {
  return {
    type: "LOGIN_USER",
    isFetching: false,
    isAuthenticated: true,
    currentMember:username,
    id_token:token
  }
}

export function loginUser(user){

	return function(dispatch){
		axios.post("/api/login", user)
		.then(function(response){

			console.log("LOGIN USER ACTION = ", response.data);
			console.log("LOGIN USER ACTION = ", user);
			localStorage.setItem('id_token', response.data.token);
			localStorage.setItem('username', user.username);

			dispatch(receiveLogin(response.data.token, user.username))

			
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
    localStorage.removeItem('id_token');
    localStorage.removeItem('username')
    dispatch(receiveLogout())
  }
}
export function checkForLocalStorage(){
	console.log("check = ", localStorage.getItem('id_token') ? true : false)

	return function(dispatch){
		if(localStorage.getItem('id_token') ? true : false){
			dispatch(receiveLogin(localStorage.getItem('id_token'), localStorage.getItem('username')))
		}
	}
}





