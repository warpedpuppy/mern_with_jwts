"use strict"
import axios from 'axios';
// The middleware to call the API for quotes



// Uses the API middlware to get a quote
export function fetchQuote() {
  return {
    [CALL_API]: {
      type:"test",
      endpoint: 'random-quote',
      types: [QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE]
    }
  }
}


export function fetchSecretQuote() {

   let token = localStorage.getItem('id_token') || null
 


   let config = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }
  

  return function(dispatch){
   axios.post("/api/testJWT/getMessage", {}, config)
   .then(function(response){
     console.log("RESPONSE FROM TEST_JWT", response.data)
     dispatch({type:"TEST_JWT", payload:response.data});
   })
   .catch(function(err){
     dispatch({type:"TEST_JWT_REJECTED", payload:err})
   })
  };
}

