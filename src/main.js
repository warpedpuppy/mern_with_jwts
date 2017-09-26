'use strict'
import React from 'react'
import Menu from './components/menu'
import Footer from './components/footer'
import {connect} from 'react-redux'


class Main extends React.Component {
	render(){
		return (
			<div>
			<Menu isAuthenticated={this.props.isAuthenticated} />
					{this.props.children}
			<Footer />
			</div>
			)
	}
}

function mapStateToProps(state) {
  
	console.log("MAIN STATE", state)
  
  return {
    isAuthenticated:state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(Main)
