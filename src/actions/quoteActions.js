"use strict"
import axios from 'axios';

export function fetchSecretQuote() {

      let id_token = localStorage.getItem('id_token')|| null;

      let config = { headers: {'Authorization': `Bearer ${id_token}`  } }

      return function(dispatch){
       axios.post("/api/testJWT/getMessage", {}, config)
       .then(function(response){
         console.log("RESPONSE FROM TEST_JWT", response.data)
         dispatch({type:"TEST_JWT", payload:response.data});
       })
       .catch(function(response, err){
        console.log("RESPONSE FROM TEST_JWT_REJECTED", response)
         dispatch({type:"TEST_JWT_REJECTED", payload:response.data})
       })
      };
}

