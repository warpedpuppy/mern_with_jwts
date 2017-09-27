"use strict"

import React from 'react';
import Login from './login';
import Register from "./register";
import {Col, Row} from 'react-bootstrap';

class UserUtilsShell extends React.Component {

	render(){
		return(
			<Row>
			<Col  xs={8} xsOffset={2} sm={6} smOffset={3} md={6} mdOffset={3} lg={6} lgOffset={3}>



  <ul className="nav nav-tabs" role="tablist">
    <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">login </a></li>
    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">register</a></li>
  </ul>

  <div className="tab-content">
    <div role="tabpanel" className="tab-pane active" id="home"><Login/></div>
    <div role="tabpanel" className="tab-pane" id="profile"><Register/></div>
  </div>

				
			</Col>
			</Row>
		)
	}
}
export default UserUtilsShell;
