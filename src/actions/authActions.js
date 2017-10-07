"use strict"
import axios from 'axios';
import {getUsers} from './userActions';
import {fetchSecretQuote} from './quoteActions';

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
            localStorage.setItem('id_token', response.data.id_token);
            localStorage.setItem('username', user.username);
            dispatch(receiveLogin(response.data.id_token, user.username))

  
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
     dispatch(fetchSecretQuote());
  }
}
export function checkForLocalStorage(){
    
     let id_token = localStorage.getItem('id_token')|| null;

    if(id_token !== null){
          let config = { headers: {'Authorization': `Bearer ${id_token}`  } }
 
          return function(dispatch){
           axios.post("/api/testJWT/isStillGood", {}, config)
           .then(function(response){

            console.log(localStorage.getItem('username'));
             console.log("RESPONSE FROM TEST_JWT", response.data)
             dispatch(receiveLogin(localStorage.getItem('id_token'), localStorage.getItem('username')))
     
           })
           .catch(function(err){
              localStorage.removeItem('id_token');
                           localStorage.removeItem('username')
            console.log("RESPONSE FROM TEST_JWT_REJECTED", err)
             dispatch({type:"TEST_JWT_REJECTED", payload:err})
           })
          };
      } else {
        return function(dispatch){
            localStorage.removeItem('id_token');
            localStorage.removeItem('username')
            dispatch(receiveLogout())
         };
      }



}



















