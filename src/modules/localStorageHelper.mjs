import { getJWT } from 'modules/api.mjs'

export function storeData(name, item) {
	localStorage.setItem(name, JSON.stringify(item));
}

/**
 * saves an value into local storage
 * @export
 * @param {*} item - the value to save into localstorage
 * @returns
 */
export function getStoredData(item) {
	return JSON.parse(localStorage.getItem(item));
}

/**
 * check if there is data in local storage
 * @export
 * @param {String} - the item to check
 * @returns {boolean}
 */
export function checkLocalStorage(item) {
	return getStoredData() ? true : false;
}


export async function getStoredJWT(){
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