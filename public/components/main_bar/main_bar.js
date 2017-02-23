'use strict';

(function () {

	const Block = window.Block;
	const Button = window.Button;
	const NewsForm = window.NewForm;
	const NewsModel = window.NewsModel;
	const NewsBlock = window.NewsBlock;

	class MainBar extends Block {
		constructor() {
			super('div', {});
			this.get().classList.add('main-bar');
			this.get().classList.add('main-bar_position_center');
			this.searchInput = new Block('input', {
				placeholder: 'Search',
			});
			this.searchInput.get().classList.add('main-bar__input');
			this.searchInput.get().classList.add('main-bar__input_position');
			this.searchButton = new Button('Search');
			this.searchButton.get().classList.remove('create');
			this.searchButton.get().classList.add('main-bar__button');
			this.searchButton.get().classList.add('main-bar__button-search_position');
			this.button = new Button('Create new');
			this.button.get().classList.remove('create');
			this.button.get().classList.add('main-bar__button');
			this.button.get().classList.add('main-bar__button-create_position');
			let form = new Block('form');
			form.get().classList.add('form_position');
			form.get().appendChild(this.searchInput.get());
			form.get().appendChild(this.searchButton.get());
			form.get().appendChild(this.button.get());
			this.get().appendChild(form.get());
			document.body.appendChild(this.get());
		}

		addListener(categories, callback) {
			this.button.get().addEventListener('click', _button => {
				_button.preventDefault();
				let form = new NewsForm(categories, callback);
			});
		}

		addSearchListener(callback){
			this.searchButton.get().addEventListener('click', button => {
				button.preventDefault();
				let searchWord = this.searchInput.get().value;
				new NewsModel().searchNews(searchWord)
					.then( (result) => {
						callback(result);
						this.rememberResult(result);
						return Promise.resolve(result);
					});
			});
		}

	}

	window.MainBar = MainBar;
})();