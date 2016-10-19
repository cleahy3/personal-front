var Person = React.createClass({
	handleClick: function(){
		//console.log(this.props.index);
		this.props.handleClick(this.props.index);
	}
	,
	render: function () {
		return(
			<tr><td>{this.props.name}</td><td id="emoticon"><img src={this.props.emoticon} /></td><td>{this.props.bio}</td><td>{this.props.rating}</td><td><a onClick={this.handleClick} className="btn-floating blue"><i className="material-icons">{this.props.icon}</i></a></td></tr>
			)
	}
});
module.exports= Person;