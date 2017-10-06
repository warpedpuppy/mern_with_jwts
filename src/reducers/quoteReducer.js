// The quotes reducer
import { 
  QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE
} from '../actions/authActions'

function quoteReducer(state = {
    isFetching: false,
    quote: '',
    authenticated: false
  }, action) {
  switch (action.type) {


    case QUOTE_REQUEST:
      let obj3 = Object.assign({}, state, {
          quote: action.payload.message
          })
      return obj3


    case QUOTE_SUCCESS:
      let obj4 = Object.assign({}, state, {
          quote: action.payload.message
          })
       console.log("obj4 = ", obj4);
       console.log("action = ", action);
      return obj4



    case QUOTE_FAILURE:
      let obj5 = Object.assign({}, state, {
          quote: action.payload.message
          })
      return obj5


    default:
      return state
  }
  return state;
}

export default quoteReducer;