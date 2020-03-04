(function (factory) {
  typeof define === 'function' && define.amd ? define(factory) :
  factory();
}((function () { 'use strict';

  /*!
   * routie - a tiny hash router
   * v0.3.2
   * http://projects.jga.me/routie
   * copyright Greg Allen 2016
   * MIT License
  */
  var Routie = function(w, isModule) {

    var routes = [];
    var map = {};
    var reference = "routie";
    var oldReference = w[reference];

    var Route = function(path, name) {
      this.name = name;
      this.path = path;
      this.keys = [];
      this.fns = [];
      this.params = {};
      this.regex = pathToRegexp(this.path, this.keys, false, false);

    };

    Route.prototype.addHandler = function(fn) {
      this.fns.push(fn);
    };

    Route.prototype.removeHandler = function(fn) {
      for (var i = 0, c = this.fns.length; i < c; i++) {
        var f = this.fns[i];
        if (fn == f) {
          this.fns.splice(i, 1);
          return;
        }
      }
    };

    Route.prototype.run = function(params) {
      for (var i = 0, c = this.fns.length; i < c; i++) {
        this.fns[i].apply(this, params);
      }
    };

    Route.prototype.match = function(path, params){
      var m = this.regex.exec(path);

      if (!m) return false;


      for (var i = 1, len = m.length; i < len; ++i) {
        var key = this.keys[i - 1];

        var val = ('string' == typeof m[i]) ? decodeURIComponent(m[i]) : m[i];

        if (key) {
          this.params[key.name] = val;
        }
        params.push(val);
      }

      return true;
    };

    Route.prototype.toURL = function(params) {
      var path = this.path;
      for (var param in params) {
        path = path.replace('/:'+param, '/'+params[param]);
      }
      path = path.replace(/\/:.*\?/g, '/').replace(/\?/g, '');
      if (path.indexOf(':') != -1) {
        throw new Error('missing parameters for url: '+path);
      }
      return path;
    };

    var pathToRegexp = function(path, keys, sensitive, strict) {
      if (path instanceof RegExp) return path;
      if (path instanceof Array) path = '(' + path.join('|') + ')';
      path = path
        .concat(strict ? '' : '/?')
        .replace(/\/\(/g, '(?:/')
        .replace(/\+/g, '__plus__')
        .replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?/g, function(_, slash, format, key, capture, optional){
          keys.push({ name: key, optional: !! optional });
          slash = slash || '';
          return '' + (optional ? '' : slash) + '(?:' + (optional ? slash : '') + (format || '') + (capture || (format && '([^/.]+?)' || '([^/]+?)')) + ')' + (optional || '');
        })
        .replace(/([\/.])/g, '\\$1')
        .replace(/__plus__/g, '(.+)')
        .replace(/\*/g, '(.*)');
      return new RegExp('^' + path + '$', sensitive ? '' : 'i');
    };

    var addHandler = function(path, fn) {
      var s = path.split(' ');
      var name = (s.length == 2) ? s[0] : null;
      path = (s.length == 2) ? s[1] : s[0];

      if (!map[path]) {
        map[path] = new Route(path, name);
        routes.push(map[path]);
      }
      map[path].addHandler(fn);
    };

    var routie = function(path, fn) {
      if (typeof fn == 'function') {
        addHandler(path, fn);
        routie.reload();
      } else if (typeof path == 'object') {
        for (var p in path) {
          addHandler(p, path[p]);
        }
        routie.reload();
      } else if (typeof fn === 'undefined') {
        routie.navigate(path);
      }
    };

    routie.lookup = function(name, obj) {
      for (var i = 0, c = routes.length; i < c; i++) {
        var route = routes[i];
        if (route.name == name) {
          return route.toURL(obj);
        }
      }
    };

    routie.remove = function(path, fn) {
      var route = map[path];
      if (!route)
        return;
      route.removeHandler(fn);
    };

    routie.removeAll = function() {
      map = {};
      routes = [];
    };

    routie.navigate = function(path, options) {
      options = options || {};
      var silent = options.silent || false;

      if (silent) {
        removeListener();
      }
      setTimeout(function() {
        window.location.hash = path;

        if (silent) {
          setTimeout(function() { 
            addListener();
          }, 1);
        }

      }, 1);
    };

    routie.noConflict = function() {
      w[reference] = oldReference;
      return routie;
    };

    var getHash = function() {
      return window.location.hash.substring(1);
    };

    var checkRoute = function(hash, route) {
      var params = [];
      if (route.match(hash, params)) {
        route.run(params);
        return true;
      }
      return false;
    };

    var hashChanged = routie.reload = function() {
      var hash = getHash();
      for (var i = 0, c = routes.length; i < c; i++) {
        var route = routes[i];
        if (checkRoute(hash, route)) {
          return;
        }
      }
    };

    var addListener = function() {
      if (w.addEventListener) {
        w.addEventListener('hashchange', hashChanged, false);
      } else {
        w.attachEvent('onhashchange', hashChanged);
      }
    };

    var removeListener = function() {
      if (w.removeEventListener) {
        w.removeEventListener('hashchange', hashChanged);
      } else {
        w.detachEvent('onhashchange', hashChanged);
      }
    };
    addListener();

    if (isModule){
      return routie;
    } else {
      w[reference] = routie;
    }
     
  };

  if (typeof module == 'undefined'){
    Routie(window);
  } else {
    module.exports = Routie(window,true);
  }

  /* 
   * Module to append fetch with some additional modules
   * based on https://codeburst.io/fetch-api-was-bringing-darkness-to-my-codebase-so-i-did-something-to-illuminate-it-7f2d8826e939
   */

  /**
   * Checks if the response is 'ok'
   * @param {*} response - the response object from a fetch request
   * @returns {Promise<*>} if response is ok, resolves with the response. Else rejects with an error
   */
  const checkStatus = response => {
  	console.log(response);
  	if (response.ok) return response;
  	else {
  		const error = new Error(response.statusText || response.status);
  		error.response = response;
  		throw error;
  	}
  };

  /**
   * Parses a response to JSON
   * @param {*} response - the response object from a fetch request
   * @returns {Promise<*>} the parsed response object
   */
  const parseJSON = res => res.json();

  /**
   * Fetch with added utilities like check for status code and json parse
   * @param {string} url - the url for this get request
   * @param {*} [init] - An object containing any custom settings that you want to apply to the request
   * @returns {Promise<*>} The resolved JSON parsed response if 200 Ok or rejection with the error reason
   */
  function get(url, init) {
  	console.log(url, init);
  	return fetch(url, init)
  		.then(checkStatus)
  		.then(parseJSON)
  		.catch(error=>console.log(error));
  }

  const baseURL = 'https://oba-jwt.herokuapp.com';

  function getJWT(key){
  	console.log(key);
  	const endpoint = '/jwt?key=';
  	const url = `${baseURL}${endpoint}${key}`;
  	const headers = new Headers();
  	headers.append('Accept', 'application/json');
  	const config = {
  		headers
  	};

  	console.log(headers.get('Accept'));

  	return get(url, config);
  }

  function storeData(name, item) {
  	localStorage.setItem(name, JSON.stringify(item));
  }

  /**
   * saves an value into local storage
   * @export
   * @param {*} item - the value to save into localstorage
   * @returns
   */
  function getStoredData(item) {
  	return JSON.parse(localStorage.getItem(item));
  }

  /**
   * check if there is data in local storage
   * @export
   * @param {String} - the item to check
   * @returns {boolean}
   */
  function checkLocalStorage(item) {
  	return getStoredData() ? true : false;
  }


  async function getStoredJWT(){
  	const key = 'f60b69054b02f50180d9c088e06270ea';
  	let token = getStoredData('jwt');

  	console.log(token);
  	
  	if (!token || (token && checkExpiration(token.exp))) {
  		token = await getJWT(key);
  		console.log(token);
  		storeData('jwt', token);
  	} else {
  		return token.jwt;
  	}
  }

  function checkExpiration(exp){
  	const now = Date.now() / 1000;
  	console.log(`now ${now}`, `exp: ${exp}`);
  	return now < exp;
  }

  var recommendations = async () => {
  	const main = document.createElement('main');
  	const section = document.createElement('section');
  	main.appendChild(section);
  	console.log('Recommendations page');


  	return main;
  };

  var profile = () => {
  	const main = document.createElement('main');
  	console.log('Profile Page');







  	return main;
  };

  function setEmptyUser(){
  	const emptyUser = {
  		userID: 83913,
  		age: null,
  		city: null,
  		postalCode: null,
  		gender: null,
  		genres: [],
  		obaLocation: [],
  		mediaType: [],
  		loanCategory: []
  	};

  	if(!checkLocalStorage()) storeData('user', emptyUser);
  }

  routie({
  	'': init,
  	'profile': profilePage,
  	'recommendations': recommendationsPage
  });


  function init(){
  	setEmptyUser();
  	routie('profile');
  	getStoredJWT().then(jwt => console.log(jwt) );
  	
  }

  function recommendationsPage() {
  	removeOldPage();
  	const body = document.body;
  	body.appendChild(recommendations());
  }

  function profilePage() {
  	removeOldPage();
  	const body = document.body;
  	body.appendChild(profile());
  }

  function removeOldPage() {
  	const main = document.querySelector('main');
  	main.remove();
  }

})));
//# sourceMappingURL=main.js.map
