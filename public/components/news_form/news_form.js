'use strict';

(function(){

	const Block = window.Block;
	const Button = window.Button;
	const NewsModel = window.NewsModel;


	class NewForm extends Block{
		constructor(categories){
			super('div');
			let outsideBlock = new Block('div');
			outsideBlock.get().classList.add('newsFormBlock');
			let block = new Block('div');
			block.get().classList.add('newsForm');
			this.title = new Block('h1');
			this.form = new Block('form');
			this.newsTitle = new Block('h3');
			this.title.get().innerHTML = 'Create news';
			this.newsTitle.get().innerHTML = 'Enter title';
			this.newsTitleInput = new Block('input', {
				name : 'title',
				placeholder: 'Enter title here'
			});
			this.newsTitleInput.get().classList.add('titleForm');
			this.categories = new Block('input', {
				name: 'categories',
				placeholder: 'or enter new category here'
			});
			this.categories.get().classList.add('inputCategory');
			this.categories.get().classList.add('titleForm');
			this.mainContent = new Block('textarea', {
				name: 'content',
				placeholder: 'Enter text here'
			});
			this.mainContent.get().classList.add('titleForm');

			this.select = new Block('select');
			let init = new Block('option');
			init.get().innerHTML = 'Select category from list';
			this.select.get().appendChild(init.get());


			categories.forEach( category => {
				let option = new Block('option');
				option.get().innerHTML = category.name;
				this.select.get().appendChild(option.get());
			});
			this.button = new Button('Create');
			this.buttonClose = new Button('Close');
			this.form.get().appendChild(this.title.get());
			this.form.get().appendChild(this.newsTitle.get());
			this.form.get().appendChild(this.newsTitleInput.get());
			this.form.get().appendChild(this.select.get());
			this.form.get().appendChild(this.categories.get());
			this.form.get().appendChild(this.mainContent.get());
			this.form.get().appendChild(this.button.get());
			this.form.get().appendChild(this.buttonClose.get());
			block.get().appendChild(this.form.get());
			outsideBlock.get().appendChild(block.get());
			this.get().classList.add('formPosition');
			document.body.insertBefore(this.get(), document.body.children[0]);
			document.body.insertBefore(outsideBlock.get(), document.body.children[0]);
			this.addListener(outsideBlock);
		}

		addListener(outSideBlock){
			this.button.get().addEventListener('click', button => {
				button.preventDefault();
				let title = this.newsTitleInput.get().value;
				let category = this.categories.get().value;
				let select = this.select.get().value;
				let content = this.mainContent.get().value;
				if(select === 'Select category from list'){
					new NewsModel().createCategory(category)
						.then(result => {
							console.log(category);
							let data = {
								title: title,
								category: category,
								content: content
							};
							new NewsModel().createNews(data);
						})
				} else {
					category = select;
					let data = {
						title: title,
						category: category,
						content: content
					};
					new NewsModel().createNews(data);
				}
				document.body.removeChild(this.get());
				document.body.removeChild(outSideBlock.get());
			});
			this.buttonClose.get().addEventListener('click', button => {
				button.preventDefault();
				document.body.removeChild(this.get());
				document.body.removeChild(outSideBlock.get());
			})
		}
	}

	window.NewForm = NewForm;
})();
