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
			title.get().innerHTML = "Categories:";
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
			let link = new Button(category);
			link.get().classList.remove('create');
			link.get().classList.add('tagButton');
			this.list.get().appendChild(link.get());
			link.get().addEventListener('click', link => {
				link.preventDefault();
				new NewsModel().searchNewsCategory(category)
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
			})
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

	window.TagMenu = TagMenu;
})();