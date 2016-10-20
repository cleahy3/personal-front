var appDispatcher = require('../dispatcher/appDispatcher.js');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var Alert = require('react-uikit-alert').default;
var axios = require('axios');
import Popup from 'react-popup';
var Constants = require('../constants/constants.jsx');
var _data;

var MainStore = merge(EventEmitter.prototype, {
    getData: function() {

        return _data
    },
    handleAction: function(payload) {
        if (_data) {
            axios({
                method: 'post',
                url: 'https://people-server.herokuapp.com/',
                data: _data

            });
        } else {
            axios.get('https://people-server.herokuapp.com/')
                .then(function(response) {

                    _data = response.data;

                });
        }

        switch (payload.action) {
            case Constants.HOME_CLICKED:
                MainStore.emit('showHome');
                break;
            case Constants.BROWSE_CLICKED:
                MainStore.emit('showBrowse');
                break;
            case Constants.LOGIN_CLICKED:
                MainStore.emit('showLogin');
                break;
            case Constants.LIKE:

                var push = true;
                for (var i = 0; i < _data.authUser[_data.loggedIndex].favourites.length; i++) {
                    if (_data.authUser[_data.loggedIndex].favourites[i].name == _data.people[payload.data].name) {
                        push = false;
                    }
                }
                if (push == true) {
                    _data.authUser[_data.loggedIndex].favourites.push(_data.people[payload.data]);
                    _data.people[payload.data].isLiked = true;
                    if (payload.page) {
                        MainStore.emit('showHome');
                    } else {
                        MainStore.emit('liked');
                    }
                } else { MainStore.emit('cantLike');
                }
                break;
            case Constants.DISLIKE:
                if (payload.page) {
                    MainStore.emit('showHome');
                    _data.authUser[_data.loggedIndex].favourites.splice(payload.data, 1);
                } else {


                    MainStore.emit('disliked');
                    var name = _data.people[payload.data].name;
                    console.log(name);
                    for (var i = 0; i < _data.authUser[_data.loggedIndex].favourites.length; i++) {
                        if (_data.authUser[_data.loggedIndex].favourites[i].name == name) {
                            _data.authUser[_data.loggedIndex].favourites.splice(i, 1);
                            break;
                        }
                    }
                }


                break;
            case Constants.LOGIN_SUBMIT:

                _data.compareUser = payload.data;
                MainStore.handleLogin();
                break;
            case Constants.LOGOUT:
                MainStore.emit('logout');

                break;
            case Constants.NEW_CLICKED:
                MainStore.emit('new');
                break;
            case Constants.NEW_SUBMIT:
                MainStore.emit('showHome');
                _data.people.push(payload.data);
                break;
            case Constants.REG_CLICKED:
                MainStore.emit('navReg');

                break;
            case Constants.REG_SUBMIT:
                MainStore.emit('showHome');
                _data.authUser.push(payload.data);
                _data.loggedIndex = _data.authUser.length - 1;
                break;
            default:
                break;
        }
    },
    handleLogin: function() {
        var pass = false;
        var user = false;
        var now = new Date();
        var time = now.getTime();
        time += 3600 * 1000;
        now.setTime(time);

        for (var i = 0; i < _data.authUser.length; i++) {
            if (_data.authUser[i].user == _data.compareUser.user && _data.authUser[i].password == _data.compareUser.password) {
                document.cookie="logStatus=true;expires="+now.toTimeString()+";";
                MainStore.emit('showHome');
                _data.loggedIndex = i;
                user = true;
                pass = true;
                break;
            } else {
                if (_data.authUser[i].user == _data.compareUser.user) {
                    pass = false;
                } else if (_data.authUser[i].password == _data.compareUser.password) {
                    user = false;
                }
            }
        }
        if (user == true && pass == false) {

        } else if (user == false && pass == true) {

        } else if (user == false && pass == false) {

            MainStore.emit('incorrectLog');
        }
    }
})
appDispatcher.register(MainStore.handleAction);


module.exports = MainStore;