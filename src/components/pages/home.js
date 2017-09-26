"use strict"
import React from 'react';
import {Col, Row, Well, FormGroup, Form, Button, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUsers, registerUsers} from '../../actions/userActions';
import {findDOMNode} from 'react-dom';

class Home extends React.Component {

	constructor(){
			super();
		}

	componentDidMount(){
		console.log("HOME CALL FOR GET USERS")
		this.props.getUsers();
	}
	register(){
			const user={
				username:findDOMNode(this.refs.username).value, 
				password:findDOMNode(this.refs.password).value
			};
			console.log("USER + ", user)
			this.props.registerUsers(user);
		}

	render(){

		
		const usersList = this.props.users.map(function(usersArr){
			return (
				<div key={usersArr._id}>username: {usersArr.username}</div>
			)
		});
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
		        <Checkbox>Remember me</Checkbox>
		      </Col>
		    </FormGroup>

		    <FormGroup>
		      <Col smOffset={2} sm={10}>
		        <Button onClick={this.register.bind(this)}>
		          Sign in
		        </Button>
		      </Col>
		    </FormGroup>
		  </Form>
		);
		return(
				<div>
					<Row>
						<Col xs={8} xsOffset={2} sm={6} smOffset={3} md={6} mdOffset={3} lg={6} lgOffset={3}>
							{formInstance}
						</Col>
					</Row>
					<Row>
					<Col xs={8} xsOffset={2} sm={6} smOffset={3} md={6} mdOffset={3} lg={6} lgOffset={3}>
					<Well>
						{usersList}
						</Well>
						</Col>
					</Row>
				</div>
			)


	}
}
function mapStateToProps(state){
	console.log("STATE FROM HOME = ", state)
	return {
		users:state.usersReducer.users,
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getUsers:getUsers, registerUsers:registerUsers}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);




