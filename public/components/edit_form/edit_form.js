'use strict';

(function(){

	const Block = window.Block;
	const Button = window.Button;
	const NewsModel = window.NewsModel;

	class EditForm{
		constructor(content, id){
			let outsideBlock = new Block('div');
			let insideBlock = new Block('div');
			let blackBlock = new Block('div');
			outsideBlock.get().classList.add('newsFormBlock');
			insideBlock.get().classList.add('newsForm');
			blackBlock.get().classList.add('formPosition');
			this.form = new Block('form');
			this.text = new Block('h4');
			this.text.get().innerHTML = 'Edit your content';
			this.input = new Block('input', {
				value : content
			});
			this.editButton = new Button('Edit');
			this.addlistener(outsideBlock, blackBlock, id);
			this.form.get().appendChild(this.text.get());
			this.form.get().appendChild(this.input.get());
			this.form.get().appendChild(this.editButton.get());
			insideBlock.get().appendChild(this.form.get());
			outsideBlock.get().appendChild(insideBlock.get());
			document.body.insertBefore(outsideBlock.get(), document.body.children[0]);
			document.body.insertBefore(blackBlock.get(), document.body.children[0]);
			this.news = new NewsModel();
		}

		addlistener(outsideBlock, blackBlock, id){
			this.editButton.get().addEventListener('click',button => {
				button.preventDefault();
				this.news.editNews(this.input.get().value, id);
				document.body.removeChild(outsideBlock.get());
				document.body.removeChild(blackBlock.get());
			})
		}
	}

	window.EditForm = EditForm;

})();
