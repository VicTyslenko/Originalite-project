class LocalStorage {
	constructor() {
		this.localStorage = window.localStorage;
	}

	get(key) {
		return this.localStorage.getItem(key);
	}

	set(key, value) {
		this.localStorage.setItem(key, value);
	}

	clear() {
		this.localStorage.clear();
	}
}

export default LocalStorage;
