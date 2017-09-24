"use strict"

function usersReducer(state={users:[]}, action) {
	switch(action.type){
		case "GET_USERS":
		return {...state, users:[...action.payload]}
		break;
	}
	return state;
}
export default usersReducer;