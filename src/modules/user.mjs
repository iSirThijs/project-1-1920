import {
	checkLocalStorage,
	storeData
} from 'modules/localStorageHelper.mjs';

export function setEmptyUser() {
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
	}

	if (!checkLocalStorage()) storeData('user', emptyUser);
}