var Button = React.createClass({
handleClick: function(){
 this.props.handleClick(this.props.constant);
},
render: function(){
	return(
		<div>
			<a className={this.props.classN} onClick={this.handleClick}>{this.props.constant}</a>
		</div>
	)
}
})
module.exports = Button;