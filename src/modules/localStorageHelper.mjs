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
	return getStoredData() ? true : false
}