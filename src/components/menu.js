
"use strict";
import React from 'react';
import {Nav, NavItem, Navbar, Badge, LinkContainer, Button} from 'react-bootstrap'
import {connect} from 'react-redux';
import {logout, checkForLocalStorage} from "../actions/authActions"
import {bindActionCreators} from 'redux';

class Menu extends React.Component{


	componentDidMount(){
		this.props.checkForLocalStorage();
	}
	logout(){
			
			this.props.logout();
		}
	render(){

		const { isAuthenticated } = this.props
		const buttonString = <Button bsStyle="danger" onClick={this.logout.bind(this)}>LOG OUT</Button>;

    	const button = (this.props.isAuthenticated)?buttonString:"";
    	const welcomeString = (this.props.currentMember !== "")?<span className="welcomeSpan">Welcome, {this.props.currentMember}</span>:"";

		return(
				<Navbar inverse >
				    <Navbar.Header>
				      <Navbar.Brand>
				        <a href="/">mern stack</a>&nbsp; | &nbsp;
						

				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav>
				    
				        <NavItem eventKey={2} href="/#/users">users</NavItem>
				       
				      </Nav>
				      <Nav pullRight>
				      
		        		{welcomeString}
				      	{button}
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
			)
	}
 

}
function mapStateToProps(state){
	//console.log("state from menu ", state)
	return {
		isAuthenticated:state.authReducer.isAuthenticated,
		currentMember:state.authReducer.currentMember
	}
}
function mapDispatchToProps(dispatch){
	return bindActionCreators({
		logout:logout, checkForLocalStorage:checkForLocalStorage}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);





