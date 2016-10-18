var Button = require('./button.jsx');
var Constants = require('../constants/constants.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var Alert = require('react-s-alert').default;
var MainStore = require('../stores/mainStore.js');
var LoginForm = React.createClass({
	getInitialState() {
	    return {
	        login: ""  
	    };
	   
	},
	handleClick: function(constant){
		appDispatcher.dispatch({
			action:constant,
			data:{user:document.getElementById('name').value,
			password: document.getElementById('password').value
		}
		});
	},
	componentDidMount:function() {
	      MainStore.on('incorrectLog', this.showIncorrect);
	},
	showIncorrect: function(){
		msg.show('Incorrect Username or password');
		this.setState({
			login: 'incorrect'
		})
	},
	render: function(){
		return(
			<div className="loginForm">
				<h3> Login Form </h3>
				<input type="text" id="name" placeholder="username" size="25"/><br/>
				<input type="password" id="password" placeholder="password" size="25"/><br/>
				<Button constant={Constants.LOGIN_SUBMIT} handleClick={this.handleClick}/>
			</div>
			)
	}
})
module.exports = LoginForm;