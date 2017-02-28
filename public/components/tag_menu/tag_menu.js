'use strict';

import Block from '../block/block';
import Button from '../button/button';
import './tag_menu.css';

export default class TagMenu extends Block {
	constructor() {
		super('div', {});
		this.get().classList.add('tag-block');
		let title = new Block('h2');
		this.list = new Block('ol');
		title.get().innerHTML = "Categories:";
		let block = new Block('div');
		block.get().classList.add('tag-block_padding');
		block.get().appendChild(title.get());
		block.get().appendChild(this.list.get());
		this.get().appendChild(block.get());
		document.body.appendChild(this.get());
		this.categoryArray = [];
		this.buttonsArray = [];
	}

	addCategory(category, callback) {
		this.categoryArray.push(category);
		let link = new Button(category);
		link.get().classList.remove('create');
		link.get().classList.add('tag-block__button');
		this.list.get().appendChild(link.get());
		this.buttonsArray.push(link);
		link.get().addEventListener('click', button => {
			button.preventDefault();
			let count;
			this.buttonsArray.forEach((item) => {
				item.get().classList.remove('tag-block__button_pressed');
			});
			this.categoryArray.forEach((item, i) => {
				if (item === category) {
					count = i;
				}
			});
			this.buttonsArray[count].get().classList.add('tag-block__button_pressed');
			new NewsModel().searchNewsCategory(category)
				.then(result => {
					debugger;
					callback(result);
					this.rememberResult(result);
					return Promise.resolve(result);
				});
		})
	}

	rememberResult(result) {
		this.result = result;
	}

	check() {
		if (!this.result) {
			return false;
		} else {
			return true;
		}
	}

	getResult() {
		let buffer = this.result;
		this.result = !this.result;
		return buffer;
	}
}
