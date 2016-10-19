var Button = require('./button.jsx');
var Constants = require('../constants/constants.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var Alert = require('react-s-alert').default;
var Notifications = require('react-notify-toast');
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
		alert('Incorrect Username or password');
		//notify('Incorrect Username or password');
		this.setState({
			login: 'incorrect'
		})
	},
	render: function(){
		return(
			<div className="row">
				<div className="input-field col s6 offset-s3"><h3> Login Form </h3></div>
				<div className="input-field col s6 offset-s3"><input type="text" id="name" placeholder="username" size="25" required/></div><br/>
				<div className="input-field col s6 offset-s3"><input type="password" id="password" placeholder="password" size="25" required/></div><br/>
				<div className="col s6 offset-s3"><Button classN="btn waves-effect waves-light indigo lighten-1" constant={Constants.LOGIN_SUBMIT} handleClick={this.handleClick}/></div>
			</div>
			)
	}
})
module.exports = LoginForm;