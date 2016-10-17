var Button = require('./button.jsx');
var Constants = require('../constants/constants.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var MainStore = require('../stores/mainStore.js');
var Nav = React.createClass({
	getInitialState: function() {
	    return {
	         page_state: 'home',
	         login_state: false
	    };
	},componentDidMount: function() {
	      MainStore.on('loggedIn',this.loggedIn);
	      MainStore.on('logout', this.logOut);
	},
	handleClick : function(constant){
		console.log(constant)
		appDispatcher.dispatch({
			action:constant
		})
	},
	loggedIn: function(){
		this.setState({
			login_state: true
		})
	},logOut: function(){
		this.setState({
			login_state: false
		})
	},
	
	render:function(){
		if(this.state.login_state == true){
		return(<header> Missile Job Seeker<nav id="navBar">
					<Button constant={Constants.HOME_CLICKED} handleClick={this.handleClick}/>
					<Button constant={Constants.BROWSE_CLICKED} handleClick={this.handleClick}/>
					<Button constant={Constants.LOGOUT} handleClick={this.handleClick} />
					</nav>
				</header>
			)}else{
			return(<header> Missile Job Seeker<nav id="navBar">
					<Button constant={Constants.LOGIN_CLICKED} handleClick={this.handleClick}/>
					</nav>
				</header>
			)
		}	
	}
});

module.exports = Nav;