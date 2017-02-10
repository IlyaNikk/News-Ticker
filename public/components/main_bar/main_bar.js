'use strict';

(function(){

	const Block = window.Block;
	const Button = window.Button;
	const NewsForm = window.NewForm;
	const NewsModel = window.NewsModel;
	const NewsBlock = window.NewsBlock;

	class MainBar extends Block{
		constructor(){
			super('div', {});
			this.get().classList.add('main_bar');
			this.get().classList.add('center');
			this.searchInput = new Block('input', {
				placeholder: 'Search',
			});
			this.searchInput.get().classList.add('mainBarItems');
			this.searchButton = new Button('Search');
			this.searchButton.get().classList.remove('create');
			this.searchButton.get().classList.add('mainBarItems');
			this.button = new Button('Create new');
			this.button.get().classList.remove('create');
			this.button.get().classList.add('mainBarItems');
			this.get().appendChild(this.searchInput.get());
			this.get().appendChild(this.searchButton.get());
			this.get().appendChild(this.button.get());
			document.body.appendChild(this.get());
		}

		addListener(categories){
			this.button.get().addEventListener('click', _button => {
				_button.preventDefault();
				let form = new NewsForm(categories);
			});
			this.searchButton.get().addEventListener('click', button => {
				button.preventDefault();
				let searchWord = this.searchInput.get().value;
				new NewsModel().searchNews(searchWord)
					.then(result => {
						let newsAll = document.querySelectorAll('.news');
						let mainNews = document.querySelector('.main_news');
						newsAll.forEach(news => {
							mainNews.removeChild(news);
						});
						result.forEach(news => {
							let newBlock = new NewsBlock();
							newBlock.createNews(news)
						});
					});
			})
		}

	}

	window.MainBar = MainBar;
})();