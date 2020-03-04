import fetcher from 'modules/fetcher.mjs';
const baseURL = 'https://oba-jwt.herokuapp.com';


export function makeApiUrl(user, key) {
	const endpoint = 'proxy/search';
	const query = 'tolkien';
	const url = `${baseURL}${endpoint}?q=${query}&authorization=${key}&detaillevel=Default&output=json`;
	return url;
}

export function getJWT(key){
	console.log(key);
	const endpoint = '/jwt?key=';
	const url = `${baseURL}${endpoint}${key}`;
	const headers = new Headers();
	headers.append('Accept', 'application/json');
	const config = {
		headers
	};

	console.log(headers.get('Accept'));

	return fetcher(url, config);
}

export function search(query, jwt){
	const url = new URL(`${baseURL}/proxy/search`);
	const searchParams = new URLSearchParams(query);
	url.search= searchParams;
	const config = createConfig(jwt);

	return fetcher(url, config);

}

export function createConfig(jwt = undefined){
	
	headers.append('Accept', 'application/json');
	if(jwt) headers.append('Authorization', jwt);
	const config = {
		headers: headers,
	};

	return config;
}