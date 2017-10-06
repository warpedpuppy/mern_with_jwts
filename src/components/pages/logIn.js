"use strict"
import React from 'react';
import {Col, Row, Well, FormGroup, Form, Button, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUsers} from '../../actions/userActions';
import {loginUser} from '../../actions/authActions';
import {findDOMNode} from 'react-dom';

class Login extends React.Component {

	

	componentDidMount(){
		this.props.getUsers();
	}
	login(){
			const user={
				username:findDOMNode(this.refs.username).value, 
				password:findDOMNode(this.refs.password).value
			};
			console.log("USER = ", user)
			this.props.loginUser(user);
		}
	render(){

		const usersList = this.props.users.map(function(usersArr){
			return (

				<div key={usersArr._id}>{usersArr.username}</div>
		
			)
		});
		const formInstance = (
		  <Form horizontal>
		  <h1>Log in</h1>
		    <FormGroup controlId="formHorizontalEmail">
		      <Col componentClass={ControlLabel} sm={2}>
		        User name:
		      </Col>
		      <Col sm={10}>
		        <FormControl type="text" placeholder="username" ref="username" />
		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formHorizontalPassword">
		      <Col componentClass={ControlLabel} sm={2}>
		        Password
		      </Col>
		      <Col sm={10}>
		        <FormControl type="password" placeholder="Password" ref="password" />
		      </Col>
		    </FormGroup>
		    <FormGroup>
		      <Col smOffset={2} sm={10}>
		        <Button onClick={this.login.bind(this)}>
		          Sign in
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
function mapStateToProps(state){
	return {
		users:state.usersReducer.users,
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getUsers:getUsers, loginUser:loginUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);




