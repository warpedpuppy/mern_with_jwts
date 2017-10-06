"use strict"

import React from 'react';
import {Col, Row, Well} from 'react-bootstrap';


class WelcomeMessage extends React.Component {

	render(){
		return(
			<Row>
				<Col xs={8} xsOffset={2} sm={6} smOffset={3} md={6} mdOffset={3} lg={6} lgOffset={3}>
					<Well>
						<h1>Welcome, {this.props.currentMember}!</h1>
					</Well>
				</Col>
			</Row>
		)
	}
}
export default WelcomeMessage;
