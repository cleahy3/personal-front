var Person = require('./person.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var Constants = require('../constants/constants.jsx');
var Favourites = React.createClass({
	handleClick(i){
			// console.log(i);
			appDispatcher.dispatch({
				action: Constants.DISLIKE,
				data: i,
				page: 'home'
			})
			},
	render: function(){
		var self = this;
		var people = this.props.favourites.map(function(person,i){
				
					return( <Person key={i} index={i} name={person.name} bio={person.bio} rating={person.rating} emoticon={person.emoticon} icon="delete" handleClick={self.handleClick}/>)}
				
				
				)
		return(	<div className="col s6">
				<table className="striped responsive-table" id="table1"><caption id="caption">Favourites</caption><thead><tr><th>Name</th><th>Head Shot</th><th>Bio</th><th>Rating</th></tr></thead>
				<tbody>
				{people}
				</tbody>
				</table></div>
			)
	}
})
module.exports = Favourites;