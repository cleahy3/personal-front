var Button = React.createClass({
handleClick: function(){
 this.props.handleClick(this.props.constant);
},
render: function(){
	return(
		<div>
			<a className={this.props.classN} onClick={this.handleClick}><i className="material-icons">{this.props.constant}</i></a>
		</div>
	)
}
})
module.exports = Button;