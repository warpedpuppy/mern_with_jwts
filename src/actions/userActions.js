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