var MainStore = require('../stores/mainStore.js');
var PeopleList = require('./peopleList.jsx');
var LoginForm = require('./loginForm.jsx');
var NewPerson = require('./newPerson.jsx');
var Favourites = require('./favourites.jsx');
var Registration  = require('./reg.jsx');
var Browse = require('./browse.jsx');
var App = React.createClass({
	getInitialState:function() {
	    return {
	        page:'base'  
	    };
	},
	componentDidMount: function() {
	      MainStore.on('showHome',this.showHome);
	      MainStore.on('showBrowse',this.showBrowse);
	      MainStore.on('showLogin',this.showLogin);
	      MainStore.on('disliked',this.showDislike);
	      MainStore.on('liked',this.showLike);
	      MainStore.on('new', this.showNew);
	      MainStore.on('navReg', this.showReg);
	},showNew: function(){
		this.setState({
			page:'new'
		})
	},
	showLogin: function(){
		this.setState({
			page:'login'
		})
	},showReg: function(){
		
		this.setState({
			page:'reg'
		})
	},
	showHome: function(){
		var data  = MainStore.getData();
		this.setState({
			page:'home',
			data: data
		})
	},
	showBrowse: function(){
		var data = MainStore.getData();
		this.setState({
			page: 'browse',
			data: data
		})
	},
	showDislike: function(){
		var data = MainStore.getData();
		this.setState({
			page: 'dislike',
			data: data
		});
	},showLike: function(){
		var data = MainStore.getData();
		this.setState({
			page: 'like',
			data: data
		});
	},
	render:function(){
		switch(this.state.page){
			case 'home':
			if(this.state.data.authUser[this.state.data.loggedIndex].favourites[0]){
			return(
			<div id="tables">
			<PeopleList people={this.state.data.people} />
			<Favourites favourites={this.state.data.authUser[this.state.data.loggedIndex].favourites}/>
			</div>
			)}else{
				return(
			<div>
			<PeopleList people={this.state.data.people} />
			
			</div>
			)}
			break;
			case 'browse':
			return(
			<Browse data={this.state.data.people} />
			)
			break;
			case 'dislike':
			return (
			<h3> The Person You Clicked Has Been Removed from your list </h3>)
			break;
			case 'like':
			return (
				<h3> The Person You Clicked Has Been Added To Your Favourites </h3>)
			break;
			case 'login':
				return(<LoginForm />)
			break;
			case 'new':
				return(<NewPerson />)
			break;
			case 'reg':
				return(<Registration />)
				break;
			default:
			return(
				<h1> Welcome to the Jobsite for employers and employees alike</h1>
			)
			break;
		}
	}
});

module.exports = App;