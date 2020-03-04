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

  var recommendations = () => {
  	const main = document.createElement('main');
  	// main.setAttribute('id', 'recommendations');
  	console.log('Recommendations page');






  	return main;
  };

  var profile = () => {
  	const main = document.createElement('main');
  	console.log('Profile page');


  	return main;
  };

  const welcome = `
	<h3>Welkom</h3>
	<p>OBA jouw boek geeft aanbevelingen voor boeken op basis van data die de OBA over jou heeft. Welke data daarvoor gebruikt wordt mag jij bepalen.</p>
`;

  const user = `
	<h3>Persoonsgegevens</h3>
	<p>Persoonsgegevens gaan over wie jij bent, zoals hoe oud je bent of waar je woont</p>
	<form>
		<input type="checkbox" id="age" name="age">
		<label for="age">Leeftijd</label>
		<input type="checkbox" id="city" name="city">
		<label for="city">Woonplaats</label>
		<input type="checkbox" id="postalCode" name="postalCode">
		<label for="postalcode">Postcode</label>
		<input type="checkbox" id="gender" name="gender">
		<label for="gender">geslacht</label>
	</form>`;

  const loan = `
	<h3>Leengeschiedenis</h3>
	<p>Leengeschiedenis gaat over wat je bij de OBA hebt geleend, zoals het soort boek of welke auteurs je leest</p>
	<form>
		<input type="checkbox" id="genres" name="genres">
		<label for="genres">Genres</label>
		<input type="checkbox" id="obaLocation" name="obaLocation">
		<label for="obaLocation">OBA locaties</label>
		<input type="checkbox" id="mediaType" name="mediaType">
		<label for="mediaType">Media type</label>
		<input type="checkbox" id="loanCategory" name="loanCategory">
		<label for="loanCategory">Categorie</label>
	</form>
	`;

  var step = /*#__PURE__*/Object.freeze({
    __proto__: null,
    welcome: welcome,
    user: user,
    loan: loan
  });

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
  	if(getStoredData()) return true;
  	else return false;
  }

  var fakeUserImport = fakeUser => {
  	return {
  		userID: 83913,
  		age: 43,
  		city: 'Amsterdam',
  		postalCode: 1022,
  		gender: 'female',
  		genres: [['psychologische roman', 1], ['thriller', 3], ['biografie', 4], ['stripverhaal', 2], ['detectiveroman', 4]],
  		obaLocation: [['CEN', 10], ['BVD', 4]],
  		mediaType: [['NF', 7], ['JROM', 2], ['ROM', 1], ['DVDSPM', 4] ],
  		loanCategory: [['VOLWS', 14]]
  	}
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
  	return emptyUser;
  }


  function updateProfile(key, checked) {
  	const fakeUser = fakeUserImport();
  	const user = getStoredData('user');
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

  	console.log(key, checked);
  	console.log(fakeUser);
  	console.log(emptyUser);

  	console.log(fakeUser[key], emptyUser[key]);

  	user[key] = checked ? fakeUser[key] : emptyUser[key];

  	storeData('user', user);

  }

  var setup = (nextStep) => {
  	console.log('Setup Page');
  	if(nextStep === 'welcome') setEmptyUser();
  	const main = document.createElement('main');
  	const section = createSetupStep(nextStep);

  	main.appendChild(section);

  	return main;
  };

  function createSetupStep(nextStep) {
  	const section = document.createElement('section');
  	section.insertAdjacentHTML('beforeend', step[nextStep]);

  	const links = createLinks(nextStep);
  	section.appendChild(links);

  	const checkboxes = section.querySelectorAll('input[type="checkbox"]');
  	console.log(checkboxes);
  	checkboxes.forEach((checkbox) => {
  		checkbox.addEventListener('change', (event) => {
  			const key = event.target.name;
  			const checked = event.target.checked;

  			updateProfile(key, checked);
  		});
  	});
  	
  	return section;
  }


  function createLinks(nextStep){
  	const div = document.createElement('div');

  	switch(nextStep){
  	case 'welcome' : {
  		div.insertAdjacentHTML('beforeend','<a href=\'#setup/user\'>Volgende</a>');
  		break;
  	}
  	case 'user' : {
  		div.insertAdjacentHTML('beforeend','<a href=\'#setup/welcome\'>Vorige</a><a href=\'#setup/loan\'>Volgende</a>');
  		break;
  	}
  	case 'loan' : {
  		div.insertAdjacentHTML('beforeend','<a href=\'#setup/user\'>Vorige</a><a href=\'#profile\'>Ga naar profiel</a><a href=\'#profile\'>Ga naar aanbevelingen</a>');
  		break;
  	}
  	}
  	return div;
  	
  }

  //<div><button>Vorige</button><button>Volgende</button></div>

  routie({
  	'': init,
  	'profile': profilePage,
  	'recommendations': recommendationsPage,
  	'setup': () => routie('setup/welcome'),
  	'setup/:step': setupPage,
  });

  function init(){
  	// temp clear of user data
  	localStorage.removeItem('user');

  	if (checkLocalStorage()) routie('profile');
  	else {
  		routie('setup');
  	}}

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

  function setupPage(step) {
  	removeOldPage();
  	const body = document.body;
  	body.appendChild(setup(step));
  }

  function removeOldPage(){
  	const main = document.querySelector('main');
  	main.remove();
  }

})));
//# sourceMappingURL=main.js.map
