var Button = React.createClass({
handleClick: function(){
 this.props.handleClick(this.props.constant);
},
render: function(){
	return(
		<div>
			<input id = "button" type="submit" value={this.props.constant} onClick={this.handleClick}/>
		</div>
	)
}
})
module.exports = Button;