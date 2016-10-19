

var appDispatcher = require('../dispatcher/appDispatcher.js');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var Alert = require('react-uikit-alert').default;
var axios = require('axios');
var Constants = require('../constants/constants.jsx');
var _data;
//     people: [{
//         name: "Callum Leahy",
//         emoticon: 'http://www.placecage.com/200/300',
//         bio: "Proud problem solver. Future teen idol. Twitter fan. Unable to type with boxing gloves on. Social media guru. Entrepreneur. Hardcore food lover. Zombie buff.",
//         rating: 100,
//         isLiked: false
//     }, {
//         name: "Jeff Bridges",
//         emoticon: 'http://www.placecage.com/gif/200/300',
//         bio: "Evil music ninja. Travel enthusiast. Proud internet fanatic. Professional problem solver. Tv advocate. Zombie geek.",
//         rating: 63,
//         isLiked: false
//     }, {
//         name: "Colin Jones",
//         emoticon: 'http://www.placecage.com/c/200/300',
//         bio: "Organizer. Alcohol expert. Total beer trailblazer. Certified food specialist. Devoted analyst. Bacon advocate.",
//         rating: 34,
//         isLiked: false
//     }, {
//         name: "Adam Willerton",
//         emoticon: 'http://fillmurray.com/g/200/300',
//         bio: "Extreme twitter aficionado. Creator. Communicator. Hardcore travel fanatic.",
//         rating: 84,
//         isLiked: false

//     }, {
//         name: "Trevor Stephens",
//         emoticon: 'http://www.placecage.com/c/200/300',
//         bio: "Beer maven. Professional twitter ninja. Tv guru. Explorer. Social media advocate. Alcohol fan. Hipster-friendly reader. Analyst. Internet trailblazer.",
//         rating: 78,
//         isLiked: false
//     }, {
//         name: "William Wallace",
//         emoticon: 'http://fillmurray.com/200/300',
//         bio: "Future teen idol. Professional bacon maven. Subtly charming twitter buff. Music aficionado.",
//         rating: 57,
//         isLiked: false
//     }, {
//         name: "Phil Peters",
//         emoticon: 'http://stevensegallery.com/g/200/300',
//         bio: "Problem solver. Proud travel evangelist. Friendly internet geek. Alcohol maven. Explorer.",
//         rating: 92,
//         isLiked: false
//     }, {
//         name: "Kevin Smith",
//         emoticon: 'http://stevensegallery.com/200/300',
//         bio: "Student. Subtly charming tv practitioner. Friendly analyst. Friend of animals everywhere.",
//         rating: 70,
//         isLiked: false

//     }],
//     favourites: [],
//     authUser: [{
//         user: 'test',
//         password: 'test',
//         favourites:[]
//     }, {
//         user: 'test1',
//         password: 'test1',
//         favourites: []
//     }],
//     compareUser: {},
//     loggedIndex: 0
// }
var MainStore = merge(EventEmitter.prototype, {
    getData: function() {

        return _data
    },
    handleAction: function(payload) {
        if (_data) {
            axios({
                method: 'post',
                url: 'http://localhost:3000/',
                data: _data

            });
        } else {
            axios.get('http://localhost:3000/')
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
                } else {
                    alert('you already have this person in your favourites');
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
        for (var i = 0; i < _data.authUser.length; i++) {
            if (_data.authUser[i].user == _data.compareUser.user && _data.authUser[i].password == _data.compareUser.password) {
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