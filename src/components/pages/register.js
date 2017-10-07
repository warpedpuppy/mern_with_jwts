"use strict"
import React from 'react';
import {Col, Row, Well, FormGroup, Form, Button, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {registerUsers} from '../../actions/authActions';
import {findDOMNode} from 'react-dom';

class Register extends React.Component {

	register(){
			const user={
				username:findDOMNode(this.refs.username).value, 
				password:findDOMNode(this.refs.password).value
			};
			this.props.registerUsers(user);
		}
	

	render(){
		
		
		const formInstance = (
		  <Form horizontal>
		  <h1>register</h1>
		    <FormGroup controlId="formHorizontalEmail" >
		      <Col componentClass={ControlLabel} sm={2}>
		        User name:
		      </Col>
		      <Col sm={10}>
		        <FormControl type="text" placeholder="username" ref="username"/>
		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formHorizontalPassword" >
		      <Col componentClass={ControlLabel} sm={2}>
		        Password
		      </Col>
		      <Col sm={10}>
		        <FormControl type="password" placeholder="Password" ref="password"/>
		      </Col>
		    </FormGroup>

		    <FormGroup>
		      <Col smOffset={2} sm={10}>
		        <Button onClick={this.register.bind(this)}>
		          Register
		        </Button>
		      </Col>
		    </FormGroup>
		  </Form>
		);
		return(
				<div>
						{formInstance}
						
				</div>
			)


	}
}

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		registerUsers:registerUsers}, dispatch);
}
export default connect(null, mapDispatchToProps)(Register);




