'use strict';

(function(){

	const Block = window.Block;
	const Button = window.Button;

	class TagMenu extends Block{
		constructor(){
			super('div', {});
			this.get().classList.add('tag_menu');
			let title = new Block('h2');
			this.list = new Block('ol');
			title.get().innerHTML = "All categories:";
			let block = new Block('div');
			block.get().classList.add('tagPadding');
			block.get().appendChild(title.get());
			block.get().appendChild(this.list.get());
			this.get().appendChild(block.get());
			document.body.appendChild(this.get());
			this.categoryArray = [];
		}

		addCategory(category){
			this.categoryArray.push(category);
			let element = new Block('li');
			let link = new Button(category);
			link.get().classList.remove('create');
			link.get().classList.add('tagButton');
			element.get().appendChild(link.get());
			this.list.get().appendChild(element.get());
			link.get().addEventListener('click', link => {
				link.preventDefault();
				new NewsModel().searchNews(category)
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

		getCategories(){
			return this.categoryArray;
		}
	}

	window.TagMenu = TagMenu;
})();