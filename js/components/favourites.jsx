var Person = require('./person.jsx');
var Favourites = React.createClass({
	render: function(){
		var people = this.props.favourites.map(function(person,i){
				
					return( <Person key={i} name={person.name} bio={person.bio} rating={person.rating} emoticon={person.emoticon}/>)}
				
				
				)
		return(
				<table id="table1" ><caption id="caption">Favourites</caption><thead><tr><th>Name</th><th>Bio</th><th>Rating</th></tr></thead>
				<tbody>
				{people}
				</tbody>
				</table>
			)
	}
})
module.exports = Favourites;