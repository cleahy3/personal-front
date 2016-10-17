var appDispatcher = require('../dispatcher/appDispatcher.js');
var merge = require('merge');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/constants.jsx');
var _data = {
    people: [{
        name: "Callum Leahy",
        emoticon: 'http://www.placecage.com/200/300',
        bio: "Proud problem solver. Future teen idol. Twitter fan. Unable to type with boxing gloves on. Social media guru. Entrepreneur. Hardcore food lover. Zombie buff.",
        rating: 100,
        isLiked: false
    }, {
        name: "Jeff Bridges",
        emoticon: 'http://www.placecage.com/gif/200/300',
        bio: "Evil music ninja. Travel enthusiast. Proud internet fanatic. Professional problem solver. Tv advocate. Zombie geek.",
        rating: 63,
        isLiked: false
    }, {
        name: "Colin Jones",
        emoticon: 'http://www.placecage.com/c/200/300',
        bio: "Organizer. Alcohol expert. Total beer trailblazer. Certified food specialist. Devoted analyst. Bacon advocate.",
        rating: 34,
        isLiked: false
    }, {
        name: "Adam Willerton",
        emoticon: 'http://fillmurray.com/g/200/300',
        bio: "Extreme twitter aficionado. Creator. Communicator. Hardcore travel fanatic.",
        rating: 84,
        isLiked: false

    },{
        name: "Trevor Stephens",
        emoticon: 'http://www.placecage.com/c/200/300',
        bio: "Beer maven. Professional twitter ninja. Tv guru. Explorer. Social media advocate. Alcohol fan. Hipster-friendly reader. Analyst. Internet trailblazer.",
        rating: 78,
        isLiked: false
    }, {
        name: "William Wallace",
        emoticon: 'http://fillmurray.com/200/300',
        bio: "Future teen idol. Professional bacon maven. Subtly charming twitter buff. Music aficionado.",
        rating: 57,
        isLiked: false
    }, {
        name: "Phil Peters",
        emoticon: 'http://stevensegallery.com/g/200/300',
        bio: "Problem solver. Proud travel evangelist. Friendly internet geek. Alcohol maven. Explorer.",
        rating: 92,
        isLiked: false
    }, {
        name: "Kevin Smith",
        emoticon: 'http://stevensegallery.com/200/300',
        bio: "Student. Subtly charming tv practitioner. Friendly analyst. Friend of animals everywhere.",
        rating: 70,
        isLiked: false

    }],
    favourites:[]
}
var MainStore = merge(EventEmitter.prototype, {
    getData: function() {
        return _data
    },
    handleAction: function (payload) {
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
        	MainStore.emit('liked');
        	_data.favourites.push(_data.people[payload.data]);
        	break;
        case Constants.DISLIKE:
        	MainStore.emit('disliked');
        	_data.people.splice(payload.data,1);
        	break;
        default:
            break;
    }
}
})
appDispatcher.register(MainStore.handleAction);


module.exports = MainStore;