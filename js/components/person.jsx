var Person = React.createClass({
	render: function () {
		return(
			<tr><td>{this.props.name}</td><td id="emoticon"><img src={this.props.emoticon} /></td><td>{this.props.bio}</td><td>{this.props.rating}</td></tr>
			)
	}
});
module.exports= Person;