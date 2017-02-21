'use strict';

(function(){

	const MainView = window.MainView;
	//const NewForm = window.NewFor

	//let newsForm = new NewForm();
	let view = new MainView();
	view.getCategories();
	view.setNews();
	let changed = false;

	window.addEventListener('resize', size => {
		if(innerWidth < 1000 && !changed) {
			let tag_menu = document.body.querySelector('.tag_menu');
			let content = document.body.querySelector('.main_news');
			let buffer = document.body.querySelector('.content');
			buffer.children[0].removeChild(document.body.querySelector('.tag_menu'));
			buffer.children[0].removeChild(document.body.querySelector('.main_news'));
			tag_menu.classList.remove('tag_menu');
			let array = tag_menu.querySelectorAll('.tagButton');
			array.forEach(button => {
				button.classList.add('tagButton_adaptive');
			});
			content.classList.remove('main_news');
			tag_menu.classList.add('tag_menu_adaptive');
			content.classList.add('main_news_adaptive');
			buffer.children[0].appendChild(tag_menu);
			buffer.children[0].appendChild(content);
			changed = true;
		} else if(innerWidth >= 1000 && changed){
			let tag_menu = document.body.querySelector('.tag_menu_adaptive');
			let content = document.body.querySelector('.main_news_adaptive');
			let buffer = document.body.querySelector('.content');
			buffer.children[0].removeChild(document.body.querySelector('.tag_menu_adaptive'));
			buffer.children[0].removeChild(document.body.querySelector('.main_news_adaptive'));
			tag_menu.classList.remove('tag_menu_adaptive');
			content.classList.remove('main_news_adaptive');
			tag_menu.classList.add('tag_menu');
			let array = tag_menu.querySelectorAll('.tagButton');
			array.forEach(button => {
				button.classList.remove('tagButton_adaptive');
			});
			content.classList.add('main_news');
			buffer.children[0].appendChild(content);
			buffer.children[0].appendChild(tag_menu);
			changed = false;
		}
	})

})();
