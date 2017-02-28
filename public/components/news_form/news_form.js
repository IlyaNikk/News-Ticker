'use strict';

import Block from '../block/block';
import Button from '../button/button';
import NewsModel from '../../model/newsModel';
import './news_form.css';

export default class NewForm extends Block {
	constructor(categories, callback) {
		super('div');
		this.outsideBlock = new Block('div');
		this.outsideBlock.get().classList.add('news-form');
		this.block = new Block('div');
		this.block.get().classList.add('news-form_position');
		this.block.get().classList.add('news-form_appear');
		this.title = new Block('h1');
		this.form = new Block('form');
		this.newsTitle = new Block('h3');
		this.title.get().innerHTML = 'Create news';
		this.title.get().classList.add('news-form__form-title');
		this.newsTitle.get().innerHTML = 'Enter title';
		this.newsTitle.get().classList.add('news-form__news-title');
		this.newsTitleInput = new Block('input', {
			name: 'title',
			placeholder: 'Enter title here'
		});
		this.newsTitleInput.get().classList.add('news-form__input-title');
		this.newsTitleInput.get().classList.add('news-form__input-title_position');
		this.categories = new Block('input', {
			name: 'categories',
			placeholder: 'or enter new category here'
		});
		this.categories.get().classList.add('news-form__input-category');
		this.categories.get().classList.add('news-form__input-category_size');
		this.categories.get().classList.add('news-form__input-category_position');
		this.mainContent = new Block('textarea', {
			name: 'content',
			placeholder: 'Enter text here'
		});
		this.mainContent.get().classList.add('news-form__textarea-content');
		this.mainContent.get().classList.add('news-form__textarea-content_position');
		this.mainContent.get().classList.add('news-form__textarea-content_size');
		this.select = new Block('select');
		this.select.get().classList.add('news-form__select');
		this.select.get().classList.add('news-form__select_size');
		let init = new Block('option');
		init.get().innerHTML = 'Select category from list';
		this.select.get().appendChild(init.get());
		categories.forEach(category => {
			let option = new Block('option');
			option.get().innerHTML = category.name;
			this.select.get().appendChild(option.get());
		});
		this.button = new Button('Create');
		this.button.get().classList.add('news-form__button-create');
		this.button.get().disabled = true;
		this.buttonClose = new Button('Close');
		this.buttonClose.get().classList.add('news-form__button-close');
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
		this.get().classList.add('news-form__background');
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
			this.block.get().classList.remove('news-form_appear');
			this.block.get().classList.add('news-form_disappear');
			setTimeout(() => {
				document.body.removeChild(this.get());
				document.body.removeChild(outSideBlock.get());
			}, 500);
		})
	}

	inputListeners() {
		this.newsTitleInput.get().addEventListener('focus', input => {
			if (document.body.querySelector('.news-form__error-text-title_appear')) {
				this.form.get().children[3].classList.remove('news-form__error-text-title_appear');
				this.form.get().children[3].classList.add('news-form__error-text-title_disappear');
				setTimeout(() => this.form.get().removeChild(this.form.get().children[3]), 500);
			}
		});
		this.newsTitleInput.get().addEventListener('blur', input => {
			if (!input.target.value.length) {
				let errorBlock = new Block('p');
				errorBlock.get().innerHTML = "News title can't be empty. Please, enter it";
				errorBlock.get().classList.add('news-form__error-text-title_appear');
				this.form.get().insertBefore(errorBlock.get(), this.form.get().children[3]);
				this.contentFill = false;
				this.checkFill();
			} else {
				this.titleFill = true;
				this.checkFill();
			}
		});
		this.mainContent.get().addEventListener('focus', input => {
			let afterTextArea = this.form.get().getElementsByTagName('button');
			if (document.body.querySelector('.news-form__error-text-content_appear')) {
				this.form.get().querySelector('.news-form__errorContent').classList.remove('news-form__error-text-content_appear');
				this.form.get().querySelector('.news-form__errorContent').classList.add('news-form__error-text-content_disappear');
				setTimeout(() => this.form.get().removeChild(this.form.get().querySelector('.errorContent'), 500));
			}
		});
		this.mainContent.get().addEventListener('blur', input => {
			if (!input.target.value.length) {
				let errorBlock = new Block('p');
				errorBlock.get().innerHTML = "News title can't be empty. Please, enter it";
				errorBlock.get().classList.add('news-form__error-text-content_appear');
				errorBlock.get().classList.add('news-form__errorContent');
				this.form.get().insertBefore(errorBlock.get(), this.form.get().getElementsByTagName('button')[0]);
				this.contentFill = false;
				this.checkFill();
			} else {
				this.contentFill = true;
				this.checkFill();
			}
		});
	}

	checkFill() {
		if (this.titleFill && this.contentFill) {
			this.button.get().disabled = false;
		} else {
			this.button.get().disabled = true;
		}
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
