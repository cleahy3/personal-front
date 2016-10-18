var Button = require('./button.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var Constants= require('../constants/constants.jsx')
var Browse = React.createClass({
	getInitialState: function() {
	    return {
	     status:'base',
	     index: null    
	    };
	},
	handleClick: function(constant){
		appDispatcher.dispatch({
			action:constant,
			data:this.state.index
		})

	},
	render :function (){
		var index = Math.floor((Math.random() * this.props.data.length));
		this.state.index= index;
		return(
			<div id="browsePerson">
				<h4> {this.props.data[index].name}<br/><img src={this.props.data[index].emoticon} /></h4>
				<p> {this.props.data[index].bio}</p>
				<p> {this.props.data[index].rating}</p>
				<div id="browseButtons"><Button constant={Constants.LIKE} handleClick={this.handleClick}/> 
				<Button constant={Constants.DISLIKE} handleClick={this.handleClick}/></div>
			</div>
		)
	}
});

module.exports = Browse;