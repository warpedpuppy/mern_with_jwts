"use strict"

import React from 'react';
import {connect} from 'react-redux';
import {Col, Row, Well, FormGroup, Form, Button, ControlLabel, FormControl, Checkbox, Table, Badge} from 'react-bootstrap';

class Users extends React.Component {

	constructor(){
			super();
		}
	render(){
		let a =  this.props.currentMember;
		const usersList = this.props.users.map(function(usersArr){
			let b = (usersArr.username === a)?<Badge>this is you!</Badge>:"";
			return (
				<tr  key={usersArr._id}><td>{usersArr._id}</td><td> {usersArr.username} {b}</td></tr>
			)
		});

		return(
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
		)
	}
}
function mapStateToProps(state){
	//console.log("STATE FROM USERS = ", state)
	return {
		users:state.usersReducer.users,
		currentMember:state.authReducer.currentMember
	}
}
export default connect(mapStateToProps)(Users);
