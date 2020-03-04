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
  	return getStoredData() ? true : false
  }

  function genre(user) {
  	if (user.genres.length === 0) {
  		const goodDefaultSubjects = ['historische romans', 'sprookjes', 'romantische verhalen', 'oorlog', 'verhalenbundel'];
  		const randomNum = Math.floor(Math.random() * 5);
  		return [goodDefaultSubjects[randomNum]]
  	} else {
  		const numberOfBooks = user.genres.reduce((acc, item) => acc + item[1], 0);
  		const treshold = (numberOfBooks > 5) ? 0.2 : 0;
  		const importantGenres = [];

  		user.genres.forEach(genre => (genre[1] / numberOfBooks >= treshold) ? importantGenres.push(genre[0]) : false);
  		return importantGenres
  	}
  }

  function makeApiUrl(subject) {
  	const cors = 'https://cors-anywhere.herokuapp.com/';
  	const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
  	const query = subject;
  	const key = "ffbc1ededa6f23371bc40df1864843be";
  	const url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=Default&output=json`;
  	return url;
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
  	return fetch(url, init)
  		.then(checkStatus)
  		.then(parseJSON)
  }

  function cleanData(data) {
  	return data.map(item => {
  		return {
  			title: item.titles[0],
  			author: item.authors[0],
  			summary: item.summaries ? item.summaries[0] : 'Geen samenvatting',
  			format: item.formats[0].text,
  			year: parseInt(item.year),
  			detailLink: item.detailLink
  		}
  	});
  }

  var card = (data) => {
  	return `
	<a href="${data.detailLink}" target="_blank">
		<article class="card">
			<h4>${data.title}</h4>
			<p>${data.author}</p>
			<p>${data.summary}</p>
		</article>
	</a>
	`;
  };

  var errorMsg = (err) => {
  	return `
	<div class="error">
		<h4>Oops, er is iets misgegaan</h4>
		<p>We konden uw aanbevelingen niet voor u ophalen uit de OBA database!</p>
		<p>Klik op dit bericht om opnieuw te proberen. Als dat niet werkt kunt u het later nog een keer proberen.</p>
		<i>${err}</i>
	</div>
	`;
  };

  var seperator = (subject) => {
  	const user = getStoredData('user');

  	return `
	<div class="seperator">
		<h2>${subject}</h2>
		<p>${user.genres.length === 0 ? 'Random categorie opgehaald' : 'Gebaseerd op uw leengeschiedenis'}</p>
	</div>
	`;
  };

  function buildCard(data, target) {
      data.forEach(item => target.insertAdjacentHTML('beforeend', card(item)));
  }

  function buildErrorMsg(err, target) {
      target.insertAdjacentHTML('beforebegin', errorMsg(err));
      return document.querySelector('main > div:first-of-type')
  }

  function buildSeperator(subject, target) {
      target.insertAdjacentHTML('beforeend', seperator(subject));
      return document.querySelector('main > section:last-of-type > div:first-of-type')
  }

  function handleFetchError(err) {
  	console.error('Error while fetching ', err);

  	const main = document.querySelector('main');
  	const errorBox = buildErrorMsg(err, main);

  	//Add reload function
  	errorBox.addEventListener('click', () => location.reload());
  }

  var recommendations = () => {
  	const main = document.createElement('main');

  	const user = getStoredData('user');
  	const genrePriorities = genre(user);

  	const fetches = genrePriorities.map(subject => {
  		const url = makeApiUrl(subject);
  		const config = {
  			Authorization: `Bearer 3374c8bacbdd81eef70e7bb33d451efd`
  		};
  		return get(url, config)
  	});

  	Promise.all(fetches)
  		.then(fetchResults => {
  			fetchResults.forEach((data, i) => {
  				const section = document.createElement('section');
  				main.appendChild(section);

  				const seperator = buildSeperator(genrePriorities[i], section);
  				seperator.addEventListener('click', () => toggleContent(seperator));

  				const cleanData$1 = cleanData(data.results);
  				buildCard(cleanData$1, section);
  			});
  		})
  		.catch(err => handleFetchError(err));

  	return main;
  };

  function toggleContent(el) {
  	const container = el.parentElement;
  	container.classList.toggle('hidden');
  }

  var profile = () => {
  	const main = document.createElement('main');
  	console.log('Profile Page');







  	return main;
  };

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

  function setEmptyUser() {
  	// const emptyUser = {
  	// 	userID: 83913,
  	// 	age: null,
  	// 	city: null,
  	// 	postalCode: null,
  	// 	gender: null,
  	// 	genres: [],
  	// 	obaLocation: [],
  	// 	mediaType: [],
  	// 	loanCategory: []
  	// };

  	const emptyUser = {
  		"userID": 83913,
  		"age": 43,
  		"city": "Amsterdam",
  		"postalCode": "1022",
  		"gender": "female",
  		"genres": [
  			["psychologische roman", 1],
  			["thriller", 3],
  			["biografie", 4],
  			["stripverhaal", 2],
  			["detectiveroman", 4]
  		],
  		"obaLocation": [
  			["CEN", 10],
  			["BVD", 4]
  		],
  		"mediaType": [
  			["NF", 7],
  			["JROM", 2],
  			["ROM", 1],
  			["DVDSPM", 4]
  		],
  		"loanCategory": [
  			["VOLWS", 14]
  		]
  	};

  	if (!checkLocalStorage()) storeData('user', emptyUser);
  }

  routie({
  	'': init,
  	'profile': profilePage,
  	'recommendations': recommendationsPage
  });


  function init() {
  	setEmptyUser();
  	routie('profile');
  }

})));
//# sourceMappingURL=main.js.map
