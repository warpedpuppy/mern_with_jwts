// The quotes reducer
// import { 
//   QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE
// } from '../actions/authActions'

function quoteReducer(state = {
    isFetching: false,
    quote: '',
    authenticated: false,
    message:""
  }, action) {
  switch (action.type) {

    case "TEST_JWT":
      let obj = Object.assign({}, state, {
          message: action.payload.message
          })
      return obj

    case "TEST_JWT_REJECTED":
        obj = Object.assign({}, state, {
          message: "You need to be logged in to see this!"
          })
      return obj

    // case QUOTE_REQUEST:
    //     obj3 = Object.assign({}, state, {
    //       quote: action.payload.message
    //       })
    //   return obj3


    // case QUOTE_SUCCESS:
    //   let obj4 = Object.assign({}, state, {
    //       quote: action.payload.message
    //       })
    //   return obj4



    // case QUOTE_FAILURE:
    //   let obj5 = Object.assign({}, state, {
    //       quote: action.payload.message
    //       })
    //   return obj5


    default:
      return state
  }
  return state;
}

export default quoteReducer;