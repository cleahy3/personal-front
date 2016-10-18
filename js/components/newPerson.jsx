var Button = require('./button.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var Constants = require('../constants/constants.jsx');
var NewPerson = React.createClass({
	handleClick: function(constant){
		appDispatcher.dispatch({
			action: constant,
			data: {
				name: document.getElementById('name').value,
				bio: document.getElementById('bio').value,
				rating: document.getElementById('rating').value,
				emoticon: document.getElementById('image').value,
				isLiked: false
			}
		})
	},
	render: function(){
		return(<div className="NewPersonForm">
				<h1> New Person</h1>
				<input type="text" id="name" placeholder="name" size="25"/><br/>
				<input type="text" id="bio" placeholder="bio" size="25" height="4"/><br/>
				<input type="text" id="rating" placeholder="rating" size="25"/><br/>
				<input type="text" id="image" placeholder="link to image" size="25"/><br/>
				<Button constant={Constants.NEW_SUBMIT} handleClick={this.handleClick}/>
			</div>)
	}
})

module.exports= NewPerson;