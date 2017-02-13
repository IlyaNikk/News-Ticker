'use strict';

(function(){

	const Block = window.Block;
	const Button = window.Button;
	const NewsForm = window.NewForm;
	const NewsModel = window.NewsModel;
	const NewsBlock = window.NewsBlock;

	class MainBar extends Block {
		constructor() {
			super('div', {});
			this.get().classList.add('main_bar');
			this.get().classList.add('center');
			this.searchInput = new Block('input', {
				placeholder: 'Search',
			});
			this.searchInput.get().classList.add('mainBarItems');
			this.searchInput.get().classList.add('searchInput');
			this.searchButton = new Button('Search');
			this.searchButton.get().classList.remove('create');
			this.searchButton.get().classList.add('mainBarItems');
			this.searchButton.get().classList.add('mainBarButton');
			this.button = new Button('Create new');
			this.button.get().classList.remove('create');
			this.button.get().classList.add('mainBarItems');
			this.button.get().classList.add('mainBarButton');
			let form = new Block('form');
			form.get().classList.add('formPadding');
			form.get().appendChild(this.searchInput.get());
			form.get().appendChild(this.searchButton.get());
			form.get().appendChild(this.button.get());
			this.get().appendChild(form.get());
			document.body.appendChild(this.get());
		}

		addListener(categories) {
			this.button.get().addEventListener('click', _button => {
				_button.preventDefault();
				let form = new NewsForm(categories);
			});
		}

		addSearchListener() {
			this.searchButton.get().addEventListener('click', button => {
				button.preventDefault();
				let searchWord = this.searchInput.get().value;
				new NewsModel().searchNews(searchWord)
					.then(result => {
						// let newsAll = document.querySelectorAll('.news');
						// let mainNews = document.querySelector('.main_news');
						// newsAll.forEach(news => {
						// 	mainNews.removeChild(news);
						// });
						// result.forEach(news => {
						// 	let newBlock = new NewsBlock();
						// 	newBlock.createNews(news)
						// });
						this.rememberResult(result);
						return Promise.resolve(result);
					});
				});
		}

		rememberResult(result){
			this.result = result;
		}

		check(){
			if (!this.result){
				return false;
			} else {
				return true;
			}
		}

		getResult(){
			let buffer = this.result;
			this.result = !this.result;
			return buffer;
		}

	}

	window.MainBar = MainBar;
})();