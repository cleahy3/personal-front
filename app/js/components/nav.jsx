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
	      MainStore.on('showHome',this.loggedIn);
	      MainStore.on('logout', this.logOut);
	},
	handleClick : function(constant){
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
		return(<nav className="row deep-purple lighten-2" id="navBar"><i id="logo" className="col s2 large material-icons">thumbs_up_down </i><h3 id="title" className="col s9 m5 "> People Seeker</h3>
			<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
			<ul  className="right">
					<li><Button classN="button" constant={Constants.HOME_CLICKED} handleClick={this.handleClick}/></li>
					<li><Button classN="button" constant={Constants.BROWSE_CLICKED} handleClick={this.handleClick}/></li>
					<li><Button classN="button" constant={Constants.NEW_CLICKED} handleClick={this.handleClick} /></li>
					<li><Button classN="button" constant={Constants.LOGOUT} handleClick={this.handleClick} /></li>
				</ul>
				<ul id="mobile-demo" className="side-nav">
					<li><Button classN="b" constant={Constants.HOME_CLICKED} handleClick={this.handleClick}/></li>
					<li><Button classN="b" constant={Constants.BROWSE_CLICKED} handleClick={this.handleClick}/></li>
					<li><Button classN="b" constant={Constants.NEW_CLICKED} handleClick={this.handleClick} /></li>
					<li><Button classN="b" constant={Constants.LOGOUT} handleClick={this.handleClick} /></li>
				</ul>
					</nav>
			
			)}else{
			return(<nav className="row deep-purple lighten-2" id="navBar"><i id="logo" className="col s2 large material-icons">thumbs_up_down</i><h3 id="title"  className="col s8 m5"> People Seeker</h3>
					<a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
					<li><Button classN="button" constant={Constants.LOGIN_CLICKED} handleClick={this.handleClick}/></li>
					<li><Button classN="button" constant={Constants.REG_CLICKED} handleClick={this.handleClick}/></li>
					</ul>
					<ul id="mobile-demo" className="side-nav">
					<li><Button classN="button" constant={Constants.LOGIN_CLICKED} handleClick={this.handleClick}/></li>
					<li><Button classN="button" constant={Constants.REG_CLICKED} handleClick={this.handleClick}/></li>
					</ul>
					</nav>
		
			)
		}	
	}
});

module.exports = Nav;