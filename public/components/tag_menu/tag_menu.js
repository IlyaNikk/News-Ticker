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
			this.buttonsArray = [];
		}

		addCategory(category){
			this.categoryArray.push(category);
			let link = new Button(category);
			link.get().classList.remove('create');
			link.get().classList.add('tagButton');
			this.list.get().appendChild(link.get());
			this.buttonsArray.push(link);
			link.get().addEventListener('click', button => {
				button.preventDefault();
				let count;
				this.buttonsArray.forEach((item) => {
					item.get().classList.remove('tagButton_pressed');
				});
				this.categoryArray.forEach( (item, i) => {
					if (item === category){
						count = i;
					}
				});
				this.buttonsArray[count].get().classList.add('tagButton_pressed');
				new NewsModel().searchNewsCategory(category)
					.then(result => {
						console.log(count);
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