const BASE_URL = 'http://localhost:3000/'

function callApi(endpoint, authenticated) {
  console.log('CALL API WAS CALLED', endpoint)
  
  let token = localStorage.getItem('id_token') || null
  let config = {}
  
  if(authenticated) {
    if(token) {
      config = {
        headers: { 'Authorization': `Bearer ${token}` }
      }
    } else {
      throw "No token saved!"
    }
  }
  
  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.text()
      .then(text => ({ text, response })
    )
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text)
      }
      
      return text
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {
  console.log("HERE HERE HERE")
  const callAPI = action[CALL_API]
  
  // So the middleware doesn't get applied to every single action
  if (typeof callAPI === 'undefined') {
    return next(action)
  }
  
  let { endpoint, types, authenticated } = callAPI
  
  const [ requestType, successType, errorType ] = types
  console.log("TYPE = ", successType);
  console.log("endpoint = ", endpoint);
  console.log("authenticated = ", authenticated)
  // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
  return callApi(endpoint, authenticated).then(
    response => {
      console.log("HERE IS WHERE THE REDUCER SHOULD BE HIT", response)
      next({
        response,
        authenticated,
        type: successType
      })},
    error => {console.error(error);next({
      error: error.message || 'There was an error.',
      type: errorType
    })}
  )
}