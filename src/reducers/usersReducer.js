"use strict"

function usersReducer(state={users:[]}, action) {
	switch(action.type){
		case "GET_USERS":
		return {...state, users:[...action.payload]}
		break;

		case "REGISTER_USER":
		var obj = {users:[...state.users, action.payload]}
		return obj;
		break;


	}
	return state;
}
export default usersReducer;