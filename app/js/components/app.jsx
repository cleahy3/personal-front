import MainStore from '../stores/mainStore.js';
import React from 'react';
import PeopleList from './peopleList.jsx';
import LoginForm from './loginForm.jsx';
import NewPerson from './newPerson.jsx';
import Favourites from './favourites.jsx';
import Materialize from 'materialize';
import Notifications,{notify} from 'react-notify-toast';
import Registration  from './reg.jsx';
import Browse from './browse.jsx';
var App = React.createClass({
	getInitialState:function() {
	    return {
	        page:'base'  
	    };
	},
	componentDidMount: function() {
	      MainStore.on('showHome',this.showHome);
	      MainStore.on('showBrowse',this.showBrowse);
	      MainStore.on('logout',this.showLogin);
	      MainStore.on('showLogin',this.showLogin);
	      MainStore.on('disliked',this.showDislike);
	      MainStore.on('liked',this.showLike);
	      MainStore.on('new', this.showNew);
	      MainStore.on('navReg', this.showReg);
	      MainStore.on('cantLike',this.showProblem);

	},showProblem:function(){
		this.setState({
	      		page:'homeish',
	      		problem:'already exists'
	      	})
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
			<div id="tables" className="row">
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
			<span><h3 id="problem"> The Person You Clicked Has Been Removed from your list </h3><Browse data={this.state.data.people} /></span>)
			break;
			case 'like':
			return (
				<span><h3> The Person You Clicked Has Been Added To Your Favourites </h3><Browse data={this.state.data.people} /></span>)
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
			case 'homeish':
			
			return(
			<div id="tables" className="row">
			<h5 id="problem"> Already in favourites </h5>
			<PeopleList people={this.state.data.people} />
			<Favourites favourites={this.state.data.authUser[this.state.data.loggedIndex].favourites}/>
			</div>
			
			)
			break;
			default:
			return(
				<div className="row"><div className="col s6 offset-s3"><h3> Welcome to the Jobsite for employers and employees alike</h3></div></div>
			)
			break;
		}
	}
});

module.exports = App;