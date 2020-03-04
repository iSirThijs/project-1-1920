import { checkLocalStorage, storeData, getStoredData } from 'modules/localStorageHelper.mjs';
import fakeUserImport from '../user_profile.js';

export function setEmptyUser() {
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


export function updateProfile(key, checked) {
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