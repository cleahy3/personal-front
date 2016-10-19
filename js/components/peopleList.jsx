var Person = require('./person.jsx');
var appDispatcher = require('../dispatcher/appDispatcher.js');
var Constants = require('../constants/constants.jsx');
var PeopleList = React.createClass({
	handleClick: function(i){
		console.log(i);
		appDispatcher.dispatch({
				action: Constants.LIKE,
				data: i,
				page: 'home'
			})
	},
	render: function(){
		var self =this;
		var people = this.props.people.map(function(person,i){
				
				if((i%2)==0){return}else{
					return( <Person key={i} name={person.name}  handleClick={self.handleClick} bio={person.bio} rating={person.rating} emoticon={person.emoticon} index={i} icon="add"/>
				
				)}});
		return(
			<div className="col s6">
				<table className="striped responsive-table" id="table"><caption id="caption">Highlights</caption><thead><tr><th>Name</th><th>Head Shot</th><th>Bio</th><th>Rating</th></tr></thead>
				<tbody>
				{people}
				</tbody>
				</table>
			</div>
			)
	}
});

module.exports = PeopleList;