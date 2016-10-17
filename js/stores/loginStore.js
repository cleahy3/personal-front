var appDispatcher = require('../dispatcher/appDispatcher.js');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/constants.jsx');
var _data = {
	people:[
		{
			user: test,
			password:test
		},
		{
			user: test1,
			password: test1
		}
	]
}
var LoginStore = Merge(EventEmitter.Prototype,{
	getData: function(){

	},
	handleLogin:function(){
		
		
	},
	handleAction: function(payload){ switch (payload.action) {
        case Constants.LOGIN_CLICKED:
            MainStore.emit('showLogin');
            break;
        default:
            break;}
});
appDispatcher.register(MainStore.handleAction);
module.exports = LoginStore;