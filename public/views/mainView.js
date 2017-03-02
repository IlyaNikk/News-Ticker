'use strict';

import Block from '../components/block/block';
import Content from '../components/content_block/content_block';
import MainBar from '../components/main_bar/main_bar';
import NewsModel from '../model/newsModel';

export default class MainView {
	constructor(tag, blocks = {}) {
		this.mainBar = new MainBar();
		document.body.appendChild(this.mainBar.get());
		this.block = new Block('div', {});
		this.block.get().classList.add('content');
		this.content = new Content();
		this.block.get().appendChild(this.content.get());
		document.body.appendChild(this.block.get());
	}

	setNews() {
		new NewsModel().getNews()
			.then(result => {
				result.reverse();
				result.forEach((news) => {
					this.content.setNew(news);
				});
			})
	}

	getCategories() {
		new NewsModel().getCategories()
			.then(result => {
				result.forEach((category) => {
					this.content.setCategory(category.name);
				});
				this.mainBar.addListener(result, this.content.setNew.bind(this.content));
			});
		this.result = this.mainBar.addSearchListener(this.setNews.bind(this));
	}

	checkSearch(result) {
		this.content.clearNew();
		result.forEach(news => {
			this.content.setNew(news);
		});
	}

	changeToAdaptive(oldClassTag, oldClassNews, newClassTag, newClassNews, adaptive) {
		let tag_menu = document.body.querySelector('.' + oldClassTag);
		let content = document.body.querySelector('.' + oldClassNews);
		let buffer = document.body.querySelector('.content');
		buffer.children[0].removeChild(document.body.querySelector('.' + oldClassTag));
		buffer.children[0].removeChild(document.body.querySelector('.' + oldClassNews));
		let array = tag_menu.querySelectorAll('.tag-block__button');
		array.forEach(button => {
			if (adaptive) {
				button.classList.add('tag-block__button_adaptive');
			} else {
				button.classList.remove('tag-block__button_adaptive');
			}
		});
		tag_menu.classList.remove(oldClassTag);
		content.classList.remove(oldClassNews);
		if(adaptive){
			buffer.children[0].appendChild(tag_menu);
			buffer.children[0].appendChild(content);
		} else {
			buffer.children[0].appendChild(content);
			buffer.children[0].appendChild(tag_menu);
		}
		tag_menu.classList.add(newClassTag);
		content.classList.add(newClassNews);
	}

}
