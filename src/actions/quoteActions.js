"use strict"
import axios from 'axios';

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



      let id_token = localStorage.getItem('id_token')|| null;

      let config = { headers: {'Authorization': `Bearer ${id_token}`  } }

      return function(dispatch){
       axios.post("/api/testJWT/getMessage", {}, config)
       .then(function(response){
         console.log("RESPONSE FROM TEST_JWT", response.data)
         dispatch({type:"TEST_JWT", payload:response.data});
       })
       .catch(function(err){
        console.log("RESPONSE FROM TEST_JWT_REJECTED", err)
         dispatch({type:"TEST_JWT_REJECTED", payload:err})
       })
      };



      
   
}

