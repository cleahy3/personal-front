var Button = require('./button.jsx');
var Constants = require('../constants/constants.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var LoginForm = React.createClass({
	handleClick: function(constant){
		appDispatcher.dispatch({
			action:constant,
			data:{user:document.getElementById('name').value,
			password: document.getElementById('password').value
		}
		});
		console.log(constant);
	},
	render: function(){
		return(
			<div className="loginForm">
				<h3> Login Form </h3>
				<input type="text" id="name" placeholder="username" /><br/>
				<input type="text" id="password" placeholder="password"/><br/>
				<Button constant={Constants.LOGIN_SUBMIT} handleClick={this.handleClick}/>
			</div>
			)
	}
})
module.exports = LoginForm;