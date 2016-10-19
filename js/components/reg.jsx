var Button = require('./button.jsx');
var Constants = require('../constants/constants.jsx');
var Notifications = require('react-notify-toast');
var appDispatcher = require('../dispatcher/appDispatcher.js');

var Registration = React.createClass({
	
	handleClick: function(constant){
		if(document.getElementById('user').value && document.getElementById('password').value  && document.getElementById('email').value)
		{appDispatcher.dispatch({
					action: constant,
					data:{
						user: document.getElementById('user').value,
						password: document.getElementById('password').value,
						email: document.getElementById('email').value,
						favourites:[]
					}
				})}else{
			alert('fill in the form');
		}
	},
	render: function(){
		return(<div className="row">
			<h3> Registration </h3>
			<div className="input-field col s6 offset-s3"><input type="text" id="user" placeholder="user name" size="25" required/></div><br/>
			<div className="input-field col s6 offset-s3"><input type="password" id="password" placeholder="password" size="25" height="4" required/></div><br/>
			<div className="input-field col s6 offset-s3"><input type="email" id="email" placeholder="email" size="25" required/></div><br/>
			<div className="input-field col s6 offset-s3"><Button classN="waves-effect waves-light btn-large indigo lighten-1" constant={Constants.REG_SUBMIT} handleClick={this.handleClick} /></div>
			</div>)
	}
})
module.exports = Registration;