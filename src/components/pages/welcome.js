"use strict"
import React from 'react';


class Welcome extends React.Component {


	componentDidMount(){
		console.log("mounted")
	}
	render(){
		return(
			<div>welcome</div>
			)
	}



}
export default Welcome;