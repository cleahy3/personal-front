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
		return(<div className="row">
				<div className="col s6 offset-s3"><h3> New Person</h3></div>
				<div className="input-field col s6 offset-s3"><input type="text" id="name" placeholder="name" size="25" required/></div><br/>
				<div className="input-field col s6 offset-s3"><input type="text" id="bio" placeholder="bio" size="25" height="4" required/></div><br/>
				<div className="input-field col s6 offset-s3"><input type="text" id="rating" placeholder="rating" size="25" required/></div><br/>
				<div className="input-field col s6 offset-s3"><input type="text" id="image" placeholder="link to image" size="25" required/></div><br/>
				<div className="col s6 offset-s3"><Button classN="waves-effect waves-light btn-large indigo lighten-1" constant={Constants.NEW_SUBMIT} handleClick={this.handleClick}/></div>
			</div>)
	}
})

module.exports= NewPerson;