"use strict"
import React from 'react';
import {Col, Row, Well, FormGroup, Form, Button, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUsers} from '../../actions/userActions';


class Home extends React.Component {

	constructor(){
			super();
		}

	componentDidMount(){
		console.log("HOME CALL FOR GET USERS")
		this.props.getUsers();
	}
	
	render(){

		const usersList = this.props.users.map(function(usersArr){
			return (

			<Col xs={12} sm={6} md={4} key={usersArr._id}>
				<h1>{usersArr.username}</h1>
			</Col>
		
			)
		});
		const formInstance = (
		  <Form horizontal>
		    <FormGroup controlId="formHorizontalEmail">
		      <Col componentClass={ControlLabel} sm={2}>
		        User name:
		      </Col>
		      <Col sm={10}>
		        <FormControl type="text" placeholder="username" />
		      </Col>
		    </FormGroup>

		    <FormGroup controlId="formHorizontalPassword">
		      <Col componentClass={ControlLabel} sm={2}>
		        Password
		      </Col>
		      <Col sm={10}>
		        <FormControl type="password" placeholder="Password" />
		      </Col>
		    </FormGroup>

		    <FormGroup>
		      <Col smOffset={2} sm={10}>
		        <Checkbox>Remember me</Checkbox>
		      </Col>
		    </FormGroup>

		    <FormGroup>
		      <Col smOffset={2} sm={10}>
		        <Button type="submit">
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
						{usersList}
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
		getUsers:getUsers}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);




