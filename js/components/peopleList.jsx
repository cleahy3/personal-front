var Person = require('./person.jsx');
var PeopleList = React.createClass({
	render: function(){
		var people = this.props.people.map(function(person,i){
				if((i%2)==0){return}else{
					return( <Person key={i} name={person.name} bio={person.bio} rating={person.rating} emoticon={person.emoticon}/>)}
				}
				
				)
		return(
				<table id="table" ><caption id="caption">Highlights</caption><thead><tr><th>Name</th><th>Head Shot</th><th>Bio</th><th>Rating</th></tr></thead>
				<tbody>
				{people}
				</tbody>
				</table>
			)
	}
});

module.exports = PeopleList;