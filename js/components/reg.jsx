var Button = require('./button.jsx');
var Constants = require('../constants/constants.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var Registration = React.createClass({
	
	handleClick: function(constant){
		appDispatcher.dispatch({
			action: constant,
			data:{
				user: document.getElementById('user').value,
				password: document.getElementById('password').value,
				email: document.getElementById('email').value,
				favourites:[]
			}
		})
	},
	render: function(){
		return(<div className="Registration">
			<h1> Registration </h1>
				<input type="text" id="user" placeholder="user name" size="25"/><br/>
				<input type="password" id="password" placeholder="password" size="25" height="4"/><br/>
				<input type="email" id="email" placeholder="email" size="25"/><br/>
			<Button constant={Constants.REG_SUBMIT} handleClick={this.handleClick} />
			</div>)
	}
})
module.exports = Registration;