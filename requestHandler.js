"use strict"
import axios from 'axios';
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {renderToString} from 'react-dom/server';

// REACT-ROUTER 4 CHANGES
//import {match, RouterContext} from 'react-router';
import {StaticRouter} from 'react-router-dom';

import reducers from './src/reducers/index';
import routes from './src/routes';

function handleRender(req, res){
  axios.get('http://localhost:3001/users')
    .then(function(response){
      console.log("THIS IS THE THEN FROM REQUEST HANDLER")
        //  var myHtml = JSON.stringify(response.data);
        //  console.log(myHtml)
        // res.render('index', {myHtml});

        // STEP-1 CREATE A REDUX STORE ON THE SERVER
        const store = createStore(reducers, {"users":{"users":response.data}})
        // STEP-2 GET INITIAL STATE FROM THE STORE
        const initialState = JSON.stringify(store.getState()).replace(/<\/script/g, '<\\/script').replace(/<!--/g, '<\\!--');
        // STEP-3 IMPLEMENT REACT-ROUTER ON THE SERVER TO INTERCEPT CLIENT REQUESTs AND DEFINE WHAT TO DO WITH THEM
        const context = {};
        console.log("what does the context look like? ", context.url);

        const reactComponent = renderToString(
          <Provider store={store}>
            <StaticRouter
              location={req.url}
              context={context}>
              {routes}
            </StaticRouter>
          </Provider>
        );

        if (context.url) {
          // can use the `context.status` that
          // we added in RedirectWithStatus
          redirect(context.status, context.url)
        } else {
          console.log("SO HERE THEN")
          console.log("reactComponent = ", reactComponent)
          console.log("initialState = ", initialState)
          //var myHtml = {reactComponent, initialState}
          res.status(200).render('index', {reactComponent, initialState});

        }

      })
      .catch(function(err){
        console.log('#Initial Server-side rendering error', err);
      })
    }

module.exports = handleRender
