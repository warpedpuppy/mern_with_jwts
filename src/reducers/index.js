"use strict"

import {combineReducers} from 'redux';
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import quoteReducer from "./quoteReducer";

export default combineReducers({
		usersReducer:usersReducer,
		authReducer:authReducer,
		quoteReducer:quoteReducer

})