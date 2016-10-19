var Button = require('./icoButton.jsx');
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
			<div className="row"id="browsePerson">
				<h4> {this.props.data[index].name}</h4><br/><div className="col s6 offset-s3"><img src={this.props.data[index].emoticon} /></div>
				<div className="col s6 offset-s3"><p> {this.props.data[index].bio}</p> </div>
				<div className="col s6 offset-s3"><p > {this.props.data[index].rating}</p></div>
				<div id="browseButtons" className="row"><div className="col s4 offset-s2"> <Button classN="waves-effect waves-light btn-large indigo lighten-1" constant={Constants.LIKE} handleClick={this.handleClick}/> </div>
				<div className="col s4"><Button classN="waves-effect waves-light btn-large indigo lighten-1" constant={Constants.DISLIKE} handleClick={this.handleClick}/></div></div>
			</div>
		)
	}
});

module.exports = Browse;