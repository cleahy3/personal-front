var Button = require('./button.jsx');
var Constants = require('../constants/constants.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var Nav = React.createClass({
	getInitialState: function() {
	    return {
	         page_state: 'home'
	    };
	},
	handleClick : function(constant){
		appDispatcher.dispatch({
			action:constant
		})
	},

	render:function(){
		
		return(<header> Missile Job Seeker<nav id="navBar">
					<Button constant={Constants.HOME_CLICKED} handleClick={this.handleClick}/>
					<Button constant={Constants.BROWSE_CLICKED} handleClick={this.handleClick}/>
					<Button constant={Constants.LOGIN_CLICKED} handleClick={this.handleClick}/>
					</nav>
				</header>
			)
	}
});

module.exports = Nav;