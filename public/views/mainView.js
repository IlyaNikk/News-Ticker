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

}
