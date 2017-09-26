
"use strict";
import React from 'react';
import {Nav, NavItem, Navbar, Badge, LinkContainer, Button} from 'react-bootstrap'
import {connect} from 'react-redux';

class Menu extends React.Component{


	componentDidMount(){
		console.log("MENU", this.props.isAuthenticated)
		
	}

	render(){

		const { isAuthenticated } = this.props
		const buttonString = <Button bsStyle="danger">LOG OUT</Button>;
    	const button = (isAuthenticated)?buttonString:"";
		return(
				<Navbar inverse >
				    <Navbar.Header>
				      <Navbar.Brand>
				        <a href="/">user database</a>&nbsp; | &nbsp;
						
						

				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav>
				     
				        <NavItem eventKey={1} href="/#/login">log in</NavItem>
				
				        <NavItem eventKey={2} href="/#/welcome">welcome</NavItem>
				       
				      </Nav>
				      <Nav pullRight>
				        <NavItem eventKey={1} href="/admin">Admin</NavItem>
				        <NavItem eventKey={2} href="/cart">Your Cart 
				        
				        { (this.props.cartItemsNumber > 0)?
				        	(<Badge className="badge">{this.props.cartItemsNumber}</Badge>):
				        		('')	}
				        		</NavItem>
				      	{button}
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
			)
	}
 

}


export default Menu;