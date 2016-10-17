/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./js/index.jsx ***!
  \**********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var App = __webpack_require__(/*! ./components/app.jsx */ 1);
	var Nav = __webpack_require__(/*! ./components/nav.jsx */ 15);
	ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
	
	ReactDOM.render(React.createElement(Nav, null), document.getElementById('nav'));

/***/ },
/* 1 */
/*!*******************************!*\
  !*** ./js/components/app.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var MainStore = __webpack_require__(/*! ../stores/mainStore.js */ 2);
	var PeopleList = __webpack_require__(/*! ./peopleList.jsx */ 3);
	var LoginForm = __webpack_require__(/*! ./loginForm.jsx */ 5);
	var Favourites = __webpack_require__(/*! ./favourites.jsx */ 13);
	var Browse = __webpack_require__(/*! ./browse.jsx */ 14);
	var App = React.createClass({
		displayName: 'App',
	
		getInitialState: function getInitialState() {
			return {
				page: 'base'
			};
		},
		componentDidMount: function componentDidMount() {
			MainStore.on('showHome', this.showHome);
			MainStore.on('showBrowse', this.showBrowse);
			MainStore.on('showLogin', this.showLogin);
			MainStore.on('disliked', this.showDislike);
			MainStore.on('liked', this.showLike);
			MainStore.on('loggedIn', this.showHome);
		},
		showLogin: function showLogin() {
			console.log('login clicked');
			this.setState({
				page: 'login'
			});
		},
		showHome: function showHome() {
			var data = MainStore.getData();
			console.log(data);
			this.setState({
				page: 'home',
				data: data
			});
		},
		showBrowse: function showBrowse() {
			console.log('browse');
			var data = MainStore.getData();
			this.setState({
				page: 'browse',
				data: data
			});
		},
		showDislike: function showDislike() {
			var data = MainStore.getData();
			console.log('dislike');
			this.setState({
				page: 'dislike',
				data: data
			});
		}, showLike: function showLike() {
			var data = MainStore.getData();
			console.log('like');
			this.setState({
				page: 'like',
				data: data
			});
		},
		render: function render() {
			switch (this.state.page) {
				case 'home':
					console.log(this.state.data);
					if (this.state.data.authUser[this.state.data.loggedIndex].favourites[0]) {
						return React.createElement(
							'div',
							{ id: 'tables' },
							React.createElement(PeopleList, { people: this.state.data.people }),
							React.createElement(Favourites, { favourites: this.state.data.authUser[this.state.data.loggedIndex].favourites })
						);
					} else {
						return React.createElement(
							'div',
							null,
							React.createElement(PeopleList, { people: this.state.data.people })
						);
					}
					break;
				case 'browse':
					return React.createElement(Browse, { data: this.state.data.people });
					break;
				case 'dislike':
					return React.createElement(
						'h3',
						null,
						' The Person You Clicked Has Been Removed from your list '
					);
					break;
				case 'like':
					return React.createElement(
						'h3',
						null,
						' The Person You Clicked Has Been Added To Your Favourites '
					);
					break;
				case 'login':
					return React.createElement(LoginForm, null);
					break;
				default:
					return React.createElement(
						'h1',
						null,
						' Welcome to the Jobsite for employers and employees alike'
					);
					break;
			}
		}
	});
	
	module.exports = App;

/***/ },
/* 2 */
/*!********************************!*\
  !*** ./js/stores/mainStore.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var appDispatcher = __webpack_require__(/*! ../dispatcher/appDispatcher.js */ 8);
	var merge = __webpack_require__(/*! merge */ 16);
	var EventEmitter = __webpack_require__(/*! events */ 18).EventEmitter;
	var Constants = __webpack_require__(/*! ../constants/constants.jsx */ 7);
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
	
	    }, {
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
	    favourites: [],
	    authUser: [{
	        user: 'test',
	        password: 'test',
	        favourites: []
	    }, {
	        user: 'test1',
	        password: 'test1',
	        favourites: []
	    }],
	    compareUser: {},
	    loggedIndex: 0
	};
	var MainStore = merge(EventEmitter.prototype, {
	    getData: function getData() {
	        return _data;
	    },
	    handleAction: function handleAction(payload) {
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
	                _data.authUser[_data.loggedIndex].favourites.push(_data.people[payload.data]);
	                break;
	            case Constants.DISLIKE:
	                MainStore.emit('disliked');
	                _data.people.splice(payload.data, 1);
	                break;
	            case Constants.LOGIN_SUBMIT:
	                console.log(payload.data);
	                _data.compareUser = payload.data;
	                MainStore.handleLogin();
	                break;
	            case Constants.LOGOUT:
	                MainStore.emit('logout');
	                _data.break;
	            default:
	                break;
	        }
	    },
	    handleLogin: function handleLogin() {
	
	        console.log(_data.compareUser);
	        for (var i = 0; i < _data.authUser.length; i++) {
	            if (_data.authUser[i].user == _data.compareUser.user && _data.authUser[i].password == _data.compareUser.password) {
	                MainStore.emit('loggedIn');
	                _data.loggedIndex = i;
	            }
	        }
	    }
	});
	appDispatcher.register(MainStore.handleAction);
	
	module.exports = MainStore;

/***/ },
/* 3 */
/*!**************************************!*\
  !*** ./js/components/peopleList.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Person = __webpack_require__(/*! ./person.jsx */ 4);
	var PeopleList = React.createClass({
		displayName: "PeopleList",
	
		render: function render() {
			var people = this.props.people.map(function (person, i) {
				if (i % 2 == 0) {
					return;
				} else {
					return React.createElement(Person, { key: i, name: person.name, bio: person.bio, rating: person.rating, emoticon: person.emoticon });
				}
			});
			return React.createElement(
				"table",
				{ id: "table" },
				React.createElement(
					"caption",
					{ id: "caption" },
					"Highlights"
				),
				React.createElement(
					"thead",
					null,
					React.createElement(
						"tr",
						null,
						React.createElement(
							"th",
							null,
							"Name"
						),
						React.createElement(
							"th",
							null,
							"Bio"
						),
						React.createElement(
							"th",
							null,
							"Rating"
						)
					)
				),
				React.createElement(
					"tbody",
					null,
					people
				)
			);
		}
	});
	
	module.exports = PeopleList;

/***/ },
/* 4 */
/*!**********************************!*\
  !*** ./js/components/person.jsx ***!
  \**********************************/
/***/ function(module, exports) {

	"use strict";
	
	var Person = React.createClass({
		displayName: "Person",
	
		render: function render() {
			return React.createElement(
				"tr",
				null,
				React.createElement(
					"td",
					null,
					this.props.name
				),
				React.createElement(
					"td",
					{ id: "emoticon" },
					React.createElement("img", { src: this.props.emoticon })
				),
				React.createElement(
					"td",
					null,
					this.props.bio
				),
				React.createElement(
					"td",
					null,
					this.props.rating
				)
			);
		}
	});
	module.exports = Person;

/***/ },
/* 5 */
/*!*************************************!*\
  !*** ./js/components/loginForm.jsx ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Button = __webpack_require__(/*! ./button.jsx */ 6);
	var Constants = __webpack_require__(/*! ../constants/constants.jsx */ 7);
	var appDispatcher = __webpack_require__(/*! ../dispatcher/appDispatcher.js */ 8);
	var LoginForm = React.createClass({
		displayName: 'LoginForm',
	
		handleClick: function handleClick(constant) {
			appDispatcher.dispatch({
				action: constant,
				data: { user: document.getElementById('name').value,
					password: document.getElementById('password').value
				}
			});
			console.log(constant);
		},
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'loginForm' },
				React.createElement(
					'h3',
					null,
					' Login Form '
				),
				React.createElement('input', { type: 'text', id: 'name', placeholder: 'username' }),
				React.createElement('br', null),
				React.createElement('input', { type: 'text', id: 'password', placeholder: 'password' }),
				React.createElement('br', null),
				React.createElement(Button, { constant: Constants.LOGIN_SUBMIT, handleClick: this.handleClick })
			);
		}
	});
	module.exports = LoginForm;

/***/ },
/* 6 */
/*!**********************************!*\
  !*** ./js/components/button.jsx ***!
  \**********************************/
/***/ function(module, exports) {

	"use strict";
	
	var Button = React.createClass({
		displayName: "Button",
	
		handleClick: function handleClick() {
			console.log('hlelo');
			this.props.handleClick(this.props.constant);
		},
		render: function render() {
			return React.createElement(
				"div",
				null,
				React.createElement("input", { id: "button", type: "submit", value: this.props.constant, onClick: this.handleClick })
			);
		}
	});
	module.exports = Button;

/***/ },
/* 7 */
/*!************************************!*\
  !*** ./js/constants/constants.jsx ***!
  \************************************/
/***/ function(module, exports) {

	'use strict';
	
	var Constants = {
		HOME_CLICKED: 'Home',
		BROWSE_CLICKED: 'Browse',
		LOGIN_CLICKED: 'Login',
		LIKE: 'Like',
		DISLIKE: 'Dislike',
		LOGIN_SUBMIT: 'Sign In',
		LOGOUT: 'Log Out'
	
	};
	module.exports = Constants;

/***/ },
/* 8 */
/*!****************************************!*\
  !*** ./js/dispatcher/appDispatcher.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Dispatcher = __webpack_require__(/*! flux */ 9).Dispatcher;
	
	var appDispatcher = new Dispatcher();
	
	module.exports = appDispatcher;

/***/ },
/* 9 */
/*!*************************!*\
  !*** ./~/flux/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(/*! ./lib/Dispatcher */ 10);


/***/ },
/* 10 */
/*!**********************************!*\
  !*** ./~/flux/lib/Dispatcher.js ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */
	
	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var invariant = __webpack_require__(/*! fbjs/lib/invariant */ 12);
	
	var _prefix = 'ID_';
	
	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */
	
	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);
	
	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }
	
	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */
	
	  Dispatcher.prototype.register = function register(callback) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.register(...): Cannot register in the middle of a dispatch.') : invariant(false) : undefined;
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };
	
	  /**
	   * Removes a callback based on its token.
	   */
	
	  Dispatcher.prototype.unregister = function unregister(id) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): Cannot unregister in the middle of a dispatch.') : invariant(false) : undefined;
	    !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };
	
	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */
	
	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };
	
	  /**
	   * Dispatches a payload to all registered callbacks.
	   */
	
	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };
	
	  /**
	   * Is this Dispatcher currently dispatching.
	   */
	
	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };
	
	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };
	
	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };
	
	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };
	
	  return Dispatcher;
	})();
	
	module.exports = Dispatcher;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 11)))

/***/ },
/* 11 */
/*!******************************!*\
  !*** ./~/process/browser.js ***!
  \******************************/
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 12 */
/*!*********************************!*\
  !*** ./~/fbjs/lib/invariant.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */
	
	'use strict';
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	function invariant(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}
	
	module.exports = invariant;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./~/process/browser.js */ 11)))

/***/ },
/* 13 */
/*!**************************************!*\
  !*** ./js/components/favourites.jsx ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var Person = __webpack_require__(/*! ./person.jsx */ 4);
	var Favourites = React.createClass({
		displayName: "Favourites",
	
		render: function render() {
			console.log(this.props.favourites);
			var people = this.props.favourites.map(function (person, i) {
	
				return React.createElement(Person, { key: i, name: person.name, bio: person.bio, rating: person.rating, emoticon: person.emoticon });
			});
			return React.createElement(
				"table",
				{ id: "table1" },
				React.createElement(
					"caption",
					{ id: "caption" },
					"Favourites"
				),
				React.createElement(
					"thead",
					null,
					React.createElement(
						"tr",
						null,
						React.createElement(
							"th",
							null,
							"Name"
						),
						React.createElement(
							"th",
							null,
							"Bio"
						),
						React.createElement(
							"th",
							null,
							"Rating"
						)
					)
				),
				React.createElement(
					"tbody",
					null,
					people
				)
			);
		}
	});
	module.exports = Favourites;

/***/ },
/* 14 */
/*!**********************************!*\
  !*** ./js/components/browse.jsx ***!
  \**********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Button = __webpack_require__(/*! ./button.jsx */ 6);
	var appDispatcher = __webpack_require__(/*! ../dispatcher/appDispatcher.js */ 8);
	var Constants = __webpack_require__(/*! ../constants/constants.jsx */ 7);
	var Browse = React.createClass({
		displayName: 'Browse',
	
		getInitialState: function getInitialState() {
			return {
				status: 'base',
				index: null
			};
		},
		handleClick: function handleClick(constant) {
			console.log(constant);
			appDispatcher.dispatch({
				action: constant,
				data: this.state.index
			});
		},
		render: function render() {
			var index = Math.floor(Math.random() * this.props.data.length);
			this.state.index = index;
			console.log(index);
			return React.createElement(
				'div',
				{ id: 'browsePerson' },
				React.createElement(
					'h4',
					null,
					' ',
					this.props.data[index].name,
					React.createElement('br', null),
					React.createElement('img', { src: this.props.data[index].emoticon })
				),
				React.createElement(
					'p',
					null,
					' ',
					this.props.data[index].bio
				),
				React.createElement(
					'p',
					null,
					' ',
					this.props.data[index].rating
				),
				React.createElement(
					'div',
					{ id: 'browseButtons' },
					React.createElement(Button, { constant: Constants.LIKE, handleClick: this.handleClick }),
					React.createElement(Button, { constant: Constants.DISLIKE, handleClick: this.handleClick })
				)
			);
		}
	});
	
	module.exports = Browse;

/***/ },
/* 15 */
/*!*******************************!*\
  !*** ./js/components/nav.jsx ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Button = __webpack_require__(/*! ./button.jsx */ 6);
	var Constants = __webpack_require__(/*! ../constants/constants.jsx */ 7);
	var appDispatcher = __webpack_require__(/*! ../dispatcher/appDispatcher.js */ 8);
	var MainStore = __webpack_require__(/*! ../stores/mainStore.js */ 2);
	var Nav = React.createClass({
		displayName: 'Nav',
	
		getInitialState: function getInitialState() {
			return {
				page_state: 'home',
				login_state: false
			};
		}, componentDidMount: function componentDidMount() {
			MainStore.on('loggedIn', this.loggedIn);
			MainStore.on('logout', this.logOut);
		},
		handleClick: function handleClick(constant) {
			console.log(constant);
			appDispatcher.dispatch({
				action: constant
			});
		},
		loggedIn: function loggedIn() {
			this.setState({
				login_state: true
			});
		}, logOut: function logOut() {
			this.setState({
				login_state: false
			});
		},
	
		render: function render() {
			if (this.state.login_state == true) {
				return React.createElement(
					'header',
					null,
					' Missile Job Seeker',
					React.createElement(
						'nav',
						{ id: 'navBar' },
						React.createElement(Button, { constant: Constants.HOME_CLICKED, handleClick: this.handleClick }),
						React.createElement(Button, { constant: Constants.BROWSE_CLICKED, handleClick: this.handleClick }),
						React.createElement(Button, { constant: Constants.LOGOUT, handleClick: this.handleClick })
					)
				);
			} else {
				return React.createElement(
					'header',
					null,
					' Missile Job Seeker',
					React.createElement(
						'nav',
						{ id: 'navBar' },
						React.createElement(Button, { constant: Constants.LOGIN_CLICKED, handleClick: this.handleClick })
					)
				);
			}
		}
	});
	
	module.exports = Nav;

/***/ },
/* 16 */
/*!**************************!*\
  !*** ./~/merge/merge.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {/*!
	 * @name JavaScript/NodeJS Merge v1.2.0
	 * @author yeikos
	 * @repository https://github.com/yeikos/js.merge
	
	 * Copyright 2014 yeikos - MIT license
	 * https://raw.github.com/yeikos/js.merge/master/LICENSE
	 */
	
	;(function(isNode) {
	
		/**
		 * Merge one or more objects 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */
	
		var Public = function(clone) {
	
			return merge(clone === true, false, arguments);
	
		}, publicName = 'merge';
	
		/**
		 * Merge two or more objects recursively 
		 * @param bool? clone
		 * @param mixed,... arguments
		 * @return object
		 */
	
		Public.recursive = function(clone) {
	
			return merge(clone === true, true, arguments);
	
		};
	
		/**
		 * Clone the input removing any reference
		 * @param mixed input
		 * @return mixed
		 */
	
		Public.clone = function(input) {
	
			var output = input,
				type = typeOf(input),
				index, size;
	
			if (type === 'array') {
	
				output = [];
				size = input.length;
	
				for (index=0;index<size;++index)
	
					output[index] = Public.clone(input[index]);
	
			} else if (type === 'object') {
	
				output = {};
	
				for (index in input)
	
					output[index] = Public.clone(input[index]);
	
			}
	
			return output;
	
		};
	
		/**
		 * Merge two objects recursively
		 * @param mixed input
		 * @param mixed extend
		 * @return mixed
		 */
	
		function merge_recursive(base, extend) {
	
			if (typeOf(base) !== 'object')
	
				return extend;
	
			for (var key in extend) {
	
				if (typeOf(base[key]) === 'object' && typeOf(extend[key]) === 'object') {
	
					base[key] = merge_recursive(base[key], extend[key]);
	
				} else {
	
					base[key] = extend[key];
	
				}
	
			}
	
			return base;
	
		}
	
		/**
		 * Merge two or more objects
		 * @param bool clone
		 * @param bool recursive
		 * @param array argv
		 * @return object
		 */
	
		function merge(clone, recursive, argv) {
	
			var result = argv[0],
				size = argv.length;
	
			if (clone || typeOf(result) !== 'object')
	
				result = {};
	
			for (var index=0;index<size;++index) {
	
				var item = argv[index],
	
					type = typeOf(item);
	
				if (type !== 'object') continue;
	
				for (var key in item) {
	
					var sitem = clone ? Public.clone(item[key]) : item[key];
	
					if (recursive) {
	
						result[key] = merge_recursive(result[key], sitem);
	
					} else {
	
						result[key] = sitem;
	
					}
	
				}
	
			}
	
			return result;
	
		}
	
		/**
		 * Get type of variable
		 * @param mixed input
		 * @return string
		 *
		 * @see http://jsperf.com/typeofvar
		 */
	
		function typeOf(input) {
	
			return ({}).toString.call(input).slice(8, -1).toLowerCase();
	
		}
	
		if (isNode) {
	
			module.exports = Public;
	
		} else {
	
			window[publicName] = Public;
	
		}
	
	})(typeof module === 'object' && module && typeof module.exports === 'object' && module.exports);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(/*! ./../webpack/buildin/module.js */ 17)(module)))

/***/ },
/* 17 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 18 */
/*!****************************!*\
  !*** ./~/events/events.js ***!
  \****************************/
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map