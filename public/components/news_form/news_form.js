'use strict';

(function () {

	const Block = window.Block;
	const Button = window.Button;
	const NewsModel = window.NewsModel;


	class NewForm extends Block {
		constructor(categories, callback) {
			super('div');
			this.outsideBlock = new Block('div');
			this.outsideBlock.get().classList.add('newsFormBlock');
			this.block = new Block('div');
			this.block.get().classList.add('newsForm');
			this.block.get().classList.add('newsForm_appear');
			this.title = new Block('h1');
			this.form = new Block('form');
			this.newsTitle = new Block('h3');
			this.title.get().innerHTML = 'Create news';
			this.newsTitle.get().innerHTML = 'Enter title';
			this.newsTitleInput = new Block('input', {
				name: 'title',
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
			categories.forEach(category => {
				let option = new Block('option');
				option.get().innerHTML = category.name;
				this.select.get().appendChild(option.get());
			});
			this.button = new Button('Create');
			this.button.get().disabled = true;
			this.buttonClose = new Button('Close');
			this.form.get().appendChild(this.title.get());
			this.form.get().appendChild(this.newsTitle.get());
			this.form.get().appendChild(this.newsTitleInput.get());
			this.form.get().appendChild(this.select.get());
			this.form.get().appendChild(this.categories.get());
			this.form.get().appendChild(this.mainContent.get());
			this.form.get().appendChild(this.button.get());
			this.form.get().appendChild(this.buttonClose.get());
			this.block.get().appendChild(this.form.get());
			this.outsideBlock.get().appendChild(this.block.get());
			this.get().classList.add('formPosition');
			document.body.insertBefore(this.get(), document.body.children[0]);
			document.body.insertBefore(this.outsideBlock.get(), document.body.children[0]);
			this.addListener(this.outsideBlock, callback);
			this.inputListeners();
		}

		addListener(outSideBlock, callback) {
			this.button.get().addEventListener('click', button => {
				button.preventDefault();
				let title = this.newsTitleInput.get().value;
				let category = this.categories.get().value;
				let select = this.select.get().value;
				let content = this.mainContent.get().value;
				if (select === 'Select category from list') {
					new NewsModel().createCategory(category)
						.then(result => {
							let data = {
								title: title,
								category: category,
								content: content
							};
							this.getAndSet(data, content, callback);
						})
				} else {
					category = select;
					let data = {
						title: title,
						category: category,
						content: content
					};
					this.getAndSet(data, content, callback);
				}
				document.body.removeChild(this.get());
				document.body.removeChild(outSideBlock.get());
			});
			this.buttonClose.get().addEventListener('click', button => {
				button.preventDefault();
				this.block.get().classList.remove('newsForm_appear');
				this.block.get().classList.add('newsForm_disappear');
				setTimeout(() => {
					document.body.removeChild(this.get());
					document.body.removeChild(outSideBlock.get());
				}, 800);
			})
		}

		inputListeners() {
			this.newsTitleInput.get().addEventListener('change', input => {
				let errorBlock = new Block('p');
				if (document.body.querySelector('.errorText_appear') && input.target.value.length){
					this.form.get().children[3].classList.remove('errorText_appear');
					this.form.get().children[3].classList.add('errorText_disappear');
					setTimeout(() => this.form.get().removeChild(this.form.get().children[3]), 500);
				} else if (!input.target.value.length) {
					errorBlock.get().innerHTML = "News title can't be empty. Please, enter it";
					errorBlock.get().classList.add('errorText_appear');
					this.form.get().insertBefore(errorBlock.get(), this.form.get().children[3]);
				}
			})
		}

		getAndSet(data, content, callback) {
			new NewsModel().createNews(data)
				.then(result => {
					new NewsModel().searchNews(content)
						.then(result => {
							callback(result[0]);
						});
				});
		}

	}

	window.NewForm = NewForm;
})();
