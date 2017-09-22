"use strict"

function usersReducer(state={}, action) {
	switch(action.type){
		case "GET_USERS":
			return {...state}
			break;
	}
	return state;
}
export default usersReducer;