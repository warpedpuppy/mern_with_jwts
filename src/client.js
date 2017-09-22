"user strict"

import {applyMiddleware, createStore} from 'redux';
import React from 'react';
import {render} from 'react-dom';
import reducers from "./reducers/index";
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'
import thunk from 'redux-thunk';


const middleware = applyMiddleware(thunk,logger);
const store = createStore(reducers, middleware);

import Main from "./main.js";
import Home from "./components/pages/home.js";

const Routes = (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={Home}/>
			</Route>
		</Router>
	</Provider>
)

render(Routes, document.getElementById("app"));
