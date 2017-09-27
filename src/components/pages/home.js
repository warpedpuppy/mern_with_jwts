"use strict"
import React from 'react';
import {Col, Row, Well, FormGroup, Form, Button, ControlLabel, FormControl, Checkbox, Table} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUsers} from '../../actions/userActions';
import UserUtilsShell from "./userUtilsShell";

class Home extends React.Component {

	constructor(){
			super();
		}

	componentDidMount(){
		this.props.getUsers();
	}
	

	render(){

		
		const usersList = this.props.users.map(function(usersArr){
			return (

				<tr  key={usersArr._id}><td>{usersArr._id}</td><td> {usersArr.username}</td></tr>
			)
		});
		const loggedIn = (!this.props.isAuthenticated)?<UserUtilsShell />:"";

		
		return(
				<div>
					
					{loggedIn}
						
					<Row>
						<Col xs={8} xsOffset={2} sm={6} smOffset={3} md={6} mdOffset={3} lg={6} lgOffset={3}>
							<Well>
								<Table striped bordered condensed hover>
									<thead>
										<tr>
										<th>_id</th>
										<th>username</th>
										</tr>
									</thead>
									<tbody>
										{usersList}
									</tbody>
								</Table>
							</Well>
						</Col>
					</Row>
				</div>
			)


	}
}


function mapStateToProps(state){
	//console.log("STATE FROM HOME = ", state)
	return {
		users:state.usersReducer.users,
		isAuthenticated:state.authReducer.isAuthenticated
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		getUsers:getUsers }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);




