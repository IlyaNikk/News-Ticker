'use strict';

import MainView from './views/mainView';
import './css/main.css';

let view = new MainView();
view.getCategories();
view.setNews();
let changed = false;

window.addEventListener('resize', size => {
	if (innerWidth < 850 && !changed) {
		let tag_menu = document.body.querySelector('.tag-block');
		let content = document.body.querySelector('.news-block');
		let buffer = document.body.querySelector('.content');
		buffer.children[0].removeChild(document.body.querySelector('.tag-block'));
		buffer.children[0].removeChild(document.body.querySelector('.news-block'));
		tag_menu.classList.remove('tag-block');
		let array = tag_menu.querySelectorAll('.tag-block__button');
		array.forEach(button => {
			button.classList.add('tag-block__button_adaptive');
		});
		content.classList.remove('news-block');
		tag_menu.classList.add('tag-block_adaptive');
		content.classList.add('news-block_adaptive');
		buffer.children[0].appendChild(tag_menu);
		buffer.children[0].appendChild(content);
		changed = true;
	} else if (innerWidth >= 850 && changed) {
		let tag_menu = document.body.querySelector('.tag-block_adaptive');
		let content = document.body.querySelector('.news-block_adaptive');
		let buffer = document.body.querySelector('.content');
		buffer.children[0].removeChild(document.body.querySelector('.tag-block_adaptive'));
		buffer.children[0].removeChild(document.body.querySelector('.news-block_adaptive'));
		tag_menu.classList.remove('tag-block_adaptive');
		content.classList.remove('news-block_adaptive');
		tag_menu.classList.add('tag-block');
		let array = tag_menu.querySelectorAll('.tag-block__button');
		array.forEach(button => {
			button.classList.remove('tag-block__button_adaptive');
		});
		content.classList.add('news-block');
		buffer.children[0].appendChild(content);
		buffer.children[0].appendChild(tag_menu);
		changed = false;
	}
});
