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
  		const sortedGenres = user.genres.sort((lowest, highest) => highest[1] - lowest[1]);
  		sortedGenres.forEach(genre => (genre[1] / numberOfBooks >= treshold) ? importantGenres.push(genre[0]) : false);
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
  			title: item.titles ? item.titles[0] : 'Geen titel',
  			author: item.authors ? item.authors[0] : 'Geen auteur',
  			summary: item.summaries ? item.summaries : 'Geen samenvatting',
  			format: item.formats ? item.formats[0].text : 'Geen formaat',
  			year: item.year ? parseInt(item.year) : 'Geen jaar',
  			detailLink: item.detailLink
  		};
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

  var loadingState = () => {
  	return `
	<div class="loading">
	<h2>Uw aanbevelingen worden geladen!</h2>
	<div>
		<figure></figure>
	</div>
	<p>Dit kan enkele momenten duren.</p>
	</div>
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

  var sortMenu = () => {
  	return `
	<div class="sortMenu">
		<h6>Sorteer</h6>
		<form>
			<input type="radio" name="sort" id="new" value="new" checked>
			<label for="new">Nieuw eerst</label>
			<input type="radio" name="sort" id="old" value="old" >
			<label for="old">Oud eerst</label>
		</form>
	</div>
	`;
  };

  var filterMenu = () => {
  	return `
	<div class="filterMenu">
		<h6>Filter</h6>
		<form>
			<input type="radio" name="sort" id="bbb" value="bbb" checked>
			<label for="bbb">Nieuw eerst</label>
			<input type="radio" name="sort" id="aaa" value="aaa" >
			<label for="aaa">Oud eerst</label>
		</form>
	</div>
	`;
  };

  function buildCard(data, target) {
      data.forEach(item => target.insertAdjacentHTML('beforeend', card(item)));
  }

  function buildLoadingState(target) {
      target.insertAdjacentHTML('beforeend', loadingState());
  }

  function buildErrorMsg(err, target) {
      target.insertAdjacentHTML('beforebegin', errorMsg(err));
      return document.querySelector('main > div:first-of-type')
  }

  function buildSeperator(subject, target) {
      target.insertAdjacentHTML('beforeend', seperator(subject));
      return document.querySelector('main > section:last-of-type > div:first-of-type')
  }

  function buildSortMenu(target) {
      target.insertAdjacentHTML('afterbegin', sortMenu());
      return document.querySelector('aside > div.sortMenu')
  }

  function buildFilterMenu(target) {
      target.insertAdjacentHTML('beforeend', filterMenu());
      return document.querySelector('aside > div.filterMenu')
  }

  function handleFetchError(err) {
  	console.error('Error while fetching ', err);

  	const main = document.querySelector('main');
  	const errorBox = buildErrorMsg(err, main);

  	//Add reload function
  	errorBox.addEventListener('click', () => location.reload());
  }

  function toggleContent(el) {
  	const container = el.parentElement;
  	container.classList.toggle('hidden');
  }

  function sortContent() {
  	console.log('sort the content');
  }

  function filterContent() {
  	console.log('filter the content');
  }

  var recommendations = () => {
  	const main = document.createElement('main');

  	const user = getStoredData('user');
  	const genrePriorities = genre(user);

  	buildLoadingState(main);
  	const loadingState = main.querySelector('div');

  	const fetches = genrePriorities.map(subject => {
  		const url = makeApiUrl(subject);
  		const config = {
  			Authorization: `Bearer 3374c8bacbdd81eef70e7bb33d451efd`
  		};
  		return get(url, config)
  	});

  	Promise.all(fetches)
  		.then(data => buildContent(data, main, genrePriorities))
  		.then(() => removeEl(loadingState))
  		.then(() => buildInteractionMenu(main))
  		.catch(err => handleFetchError(err));

  	return main;
  };


  function buildContent(data, main, genrePriorities) {
  	data.forEach((data, i) => {
  		const section = document.createElement('section');
  		main.appendChild(section);

  		const seperator = buildSeperator(genrePriorities[i], section);
  		seperator.addEventListener('click', () => toggleContent(seperator));

  		const cleanData$1 = cleanData(data.results);
  		buildCard(cleanData$1, section);
  	});
  }


  function buildInteractionMenu(main) {
  	const aside = document.createElement('aside');
  	main.prepend(aside);

  	buildSortMenu(aside);
  	aside.querySelectorAll('.sortMenu input').forEach(label => label.addEventListener('change', () => sortContent()));

  	buildFilterMenu(aside);
  	aside.querySelectorAll('.filterMenu input').forEach(label => label.addEventListener('change', () => filterContent()));
  }

  var profile = () => {
  	const main = document.createElement('main');
  	console.log('Profile Page');







  	return main;
  };

  function elements(data){
  	const checkboxes = data.form.map((input => {
  		return `<input type="checkbox" id=${input[0]} name=${input[0]}></input><label for=${input[0]}>${input[1]}</label>`
  		;
  	}));

  	console.log(checkboxes);
  	const heading = 
  		`<h3>${data.title}</h3>
		<p>${data.description}</p>
		<form>${checkboxes.join('\n')}</form>`;

  	return heading;
  }

  var fakeUserImport = fakeUser => {
  	return {
  		userID: 83913,
  		age: 43,
  		city: 'Amsterdam',
  		postalCode: 1022,
  		gender: 'female',
  		genres: [['psychologische roman', 1], ['horror', 3], ['biografie', 4], ['stripverhaal', 2], ['detectiveroman', 4]],
  		obaLocation: [['CEN', 10], ['BVD', 4]],
  		mediaType: [['NF', 7], ['JROM', 2], ['ROM', 1], ['DVDSPM', 4] ],
  		loanCategory: [['VOLWS', 14]]
  	}
  };

  function setEmptyUser() {
  const emptyUser = {
  		userID: 83913,
  		age: undefined,
  		city: undefined,
  		postalCode: undefined,
  		gender: undefined,
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

  	user[key] = checked ? fakeUser[key] : emptyUser[key];

  	storeData('user', user);

  }

  const welcome =
  	{
  		title: 'Welkom bij OBA Jouw Boek',
  		description: 'OBA jouw boek geeft aanbevelingen voor boeken op basis van data die de OBA over jou heeft. Welke data daarvoor gebruikt wordt mag jij bepalen.',
  		form: []
  	};

  const user = 
  	{
  		title: 'Persoonsgegevens',
  		description: 'Persoonsgegevens gaan over wie jij bent, zoals hoe oud je bent of waar je woont',
  		form: [['age', 'leeftijd'], ['city', 'woonplaats'], ['postalCode', 'postcode'], ['gender', 'geslacht']]
  	};

  const loan = 
  	{
  		title: 'Persoonsgegevens',
  		description: 'Persoonsgegevens gaan over wie jij bent, zoals hoe oud je bent of waar je woont',
  		form: [['genres', 'Genres'], ['obaLocation', 'OBA locatie'], ['mediaType', 'Media Type'], ['loanCategory', 'Leen Categorie']]
  	};

  var content = /*#__PURE__*/Object.freeze({
    __proto__: null,
    welcome: welcome,
    user: user,
    loan: loan
  });

  var setup = (nextStep) => {
  	// console.log('Setup Page');
  	if(nextStep === 'welcome') setEmptyUser();
  	const main = document.createElement('main');
  	main.classList.add('setup');
  	const section = createSetupStep(nextStep);

  	main.appendChild(section);

  	return main;
  };

  function createSetupStep(nextStep) {
  	const user = getStoredData('user');

  	const section = document.createElement('section');
  	section.classList.add('setup-step');

  	let el = elements(content[nextStep]) ;
  	section.insertAdjacentHTML('beforeend', el );

  	const links = createLinks(nextStep);
  	section.appendChild(links);

  	const checkboxes = section.querySelectorAll('input[type="checkbox"]');
  	// console.log(checkboxes);
  	checkboxes.forEach((checkbox) => {
  		let checkboxID = checkbox.getAttribute('id');

  		if ( Array.isArray(user[checkboxID]) && user[checkboxID].length > 0) checkbox.checked = true;
  		else if(!Array.isArray(user[checkboxID]) && user[checkboxID]) checkbox.checked = true;
  		else checkbox.checked = false;
  		

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
  		div.insertAdjacentHTML('beforeend','<a href=\'#setup/user\'>Vorige</a><a href=\'#profile\'>Ga naar profiel</a><a href=\'#recommendations\'>Ga naar aanbevelingen</a>');
  		break;
  	}
  	}
  	return div;
  	
  }

  function recommendationsPage() {
  	removeEl(document.querySelector('main'));
  	const body = document.body;
  	body.appendChild(recommendations());
  }

  function profilePage() {
  	removeEl(document.querySelector('main'));
  	const body = document.body;
  	body.appendChild(profile());
  }

  function removeEl(target) {
  	target.remove();
  }

  function setupPage(step) {
  	removeEl(document.querySelector('main'));
  	const body = document.body;
  	body.appendChild(setup(step));
  }

  routie({
  	'': init,
  	'profile': profilePage,
  	'recommendations': recommendationsPage,
  	'setup': () => routie('setup/welcome'),
  	'setup/:step': setupPage
  });

  function init() {
  	// temp clear of user data
  	localStorage.removeItem('user');

  	if (checkLocalStorage()) routie('profile');
  	else {
  		routie('setup');
  	}}

})));
//# sourceMappingURL=main.js.map
