'use strict';

(function () {

	const Block = window.Block;
	const Button = window.Button;
	const EditForm = window.EditForm;
	const NewsModel = window.NewsModel;

	class NewsBlock extends Block {
		constructor() {
			super('div', {});
			this.header = new Block('h1', {});
			this.header.get().classList.add('new-block__title');
			this.categoriesTitle = new Block('h4', {});
			this.content = new Block('p', {});
			this.content.get().classList.add('new-block__content');
			this.categoriesTitle.get().innerHTML = 'Categories: ';
			this.editButton = new Button('Edit');
			this.editButton.get().classList.add('new-block__edit-button_position');
			this.editButton.get().classList.add('new-block__edit-button_style');
			this.deleteButton = new Button('Delete');
			this.deleteButton.get().classList.add('new-block__delete-button_position');
			this.deleteButton.get().classList.add('new-block__delete-button_style');
			this.get().classList.add('new-block');
			this.categoriesArray = [];
		}

		createNews(news) {
			this.id = news.id;
			this.header.get().innerHTML = news.title;
			//news.categories.forEach((categorie) => {
			this.newCategorie = new Block('h3');
			this.newCategorie.get().classList.add('new-block__category');
			this.newCategorie.get().innerHTML = news.category.name;
			this.get().appendChild(this.newCategorie.get());
			this.categoriesArray.push(news.category.name);
			//});
			this.content.get().innerHTML = news.content;
			this.addListener();
			this.get().appendChild(this.header.get());
			this.get().appendChild(this.categoriesTitle.get());
			this.get().appendChild(this.newCategorie.get());
			this.get().appendChild(this.content.get());
			this.get().appendChild(this.editButton.get());
			this.get().appendChild(this.deleteButton.get());
			this.get().classList.add('news-block_appear');
			document.body.querySelector('.news-block').insertBefore(this.get(),
				document.body.querySelector('.news-block').children[0]);
		}

		addListener() {
			this.editButton.get().addEventListener('click', button => {
				button.preventDefault();
				let form = new EditForm(this.content.get().innerHTML, this.id);
			});
			this.deleteButton.get().addEventListener('click', button => {
				button.preventDefault();
				new NewsModel().deleteNews(this.id)
					.then(() => {
						this.get().classList.remove('news-block_appear');
						this.get().classList.add('news-block_remove');
						setTimeout(() => {
							this.clearNew();
						}, 1300);
					});

			});
		}

		clearNew() {
			document.body.querySelector('.news-block').removeChild(this.get());
		}

	}

	window.NewsBlock = NewsBlock;

})();

