"user strict"

import {applyMiddleware, createStore} from 'redux';
import React from 'react';
import {render} from 'react-dom';
import reducers from "./reducers/index";
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router'
import thunk from 'redux-thunk';
import {BrowserRouter, HashRouter} from 'react-router-dom';

const middleware = applyMiddleware(thunk,logger);
const initialState = window.INITIAL_STATE;
const store = createStore(reducers,initialState, middleware);

//import Main from "./main.js";
// import Home from "./components/pages/home.js";
// import Login from "./components/pages/login.js";
// import Welcome from "./components/pages/welcome.js";

import routes from './routes'

const Routes = (
  <Provider store={store}>
    <HashRouter>
      {routes}
    </HashRouter>
  </Provider>
)


render(Routes, document.getElementById("app"));
