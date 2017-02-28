'use strict';

import TagMenu from '../tag_menu/tag_menu';
import NewsBlock from '../news_block/news_block';
import Block from '../block/block';
import './content_block.css'

export default class Content extends Block {
	constructor() {
		super('div', {});
		this.get().classList.add('content');
		this.get().classList.add('content_position');
		this.mainNewsBlock = new Block('div');
		this.mainNewsBlock.get().classList.add('news-block');
		this.TagMenu = new TagMenu();
		this.get().appendChild(this.mainNewsBlock.get());
		this.get().appendChild(this.TagMenu.get());
		document.body.appendChild(this.get());
		this.news = [];
	}

	setNew(news) {
		let newBlock = new NewsBlock();
		newBlock.createNews(news);
		this.news.push(newBlock);
	}

	clearNew() {
		this.news.forEach(result => {
			result.clearNew();
		});
		this.news = [];
	}

	setCategory(category) {
		this.TagMenu.addCategory(category, this.rewriteNews.bind(this));
	}

	rewriteNews(result) {
		this.clearNew();
		result.forEach(news => {
			this.setNew(news);

		})
	}
}
