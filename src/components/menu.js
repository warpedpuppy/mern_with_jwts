
"use strict";
import React from 'react';
import {Nav, NavItem, Navbar, Badge, LinkContainer} from 'react-bootstrap'


class Menu extends React.Component{


	render(){
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
				     
				        <NavItem eventKey={1} href="/about">about</NavItem>
				
				        <NavItem eventKey={2} href="/contact">contact</NavItem>
				       
				      </Nav>
				      <Nav pullRight>
				        <NavItem eventKey={1} href="/admin">Admin</NavItem>
				        <NavItem eventKey={2} href="/cart">Your Cart 
				        
				        { (this.props.cartItemsNumber > 0)?
				        	(<Badge className="badge">{this.props.cartItemsNumber}</Badge>):
				        		('')	}
				        		</NavItem>
				      	
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
			)
	}
 

}
export default Menu;