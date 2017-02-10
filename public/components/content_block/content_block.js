'use strict';

(function(){

	const TagMenu = window.TagMenu;
	const NewsBlock = window.NewsBlock;
	const Block = window.Block;

	class Content extends Block {
		constructor(){
			super('div', {});
			this.get().classList.add('center');
			this.mainNewsBlock = new Block('div');
			this.mainNewsBlock.get().classList.add('main_news');
			//this.mainNewsBlock.get().appendChild(new NewsBlock().get());
			this.TagMenu = new TagMenu();
			this.get().appendChild(this.mainNewsBlock.get());
			this.get().appendChild(this.TagMenu.get());
			document.body.appendChild(this.get());
			this.news = []
		}

		setNew(news){
			let newBlock = new NewsBlock();
			newBlock.createNews(news);
			this.news.push(newBlock);
		}

		clearNew(){
			this.news.forEach( result =>{
				result.clearNew();
			});
		}

		setCategory(category){
			this.TagMenu.addCategory(category);
		}

	}

	window.Content = Content;
})();
