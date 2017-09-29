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

  let id_token = localStorage.getItem('id_token')|| null;
      console.log("id_token = ", id_token)

      let config = { headers: {'Authorization': `Bearer ${id_token}`  } }
      console.log(config);

      return function(dispatch){
       axios.post("/api/testJWT/getMessage", {}, config)
       .then(function(response){
         console.log("RESPONSE FROM TEST_JWT", response.data)
         dispatch({type:"TEST_JWT", payload:response.data});
       })
       .catch(function(err){
        console.log("RESPONSE FROM TEST_JWT_REJECTED", response.data)
         dispatch({type:"TEST_JWT_REJECTED", payload:err})
       })
      };

      
// console.log("fetch secret quote called")
//   axios.get("/api/retrieveToken")
//    .then(function(response){
//     console.log("THIS IS THE RESPONSE", response.data)

//      // let id_token = response.data.id_token || null;
//       let id_token = localStorage.getItem('id_token')|| null;
//       console.log("id_token = ", id_token)

//       let config = { headers: {'Authorization': `Bearer ${id_token}`  } }
//       console.log(config);

//       return function(dispatch){
//        axios.post("/api/testJWT/getMessage", {}, config)
//        .then(function(response){
//          console.log("RESPONSE FROM TEST_JWT", response.data)
//          dispatch({type:"TEST_JWT", payload:response.data});
//        })
//        .catch(function(err){
//         console.log("RESPONSE FROM TEST_JWT_REJECTED", response.data)
//          dispatch({type:"TEST_JWT_REJECTED", payload:err})
//        })
//       };
//   });     
}

