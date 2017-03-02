'use strict';

import MainView from './views/mainView';
import './css/main.css';

let view = new MainView();
view.getCategories();
view.setNews();
let changed = false;

window.addEventListener('resize', size => {
	if (innerWidth < 850 && !changed) {
		view.changeToAdaptive('tag-block', 'news-block', 'tag-block__adaptive', 'news-block__adaptive', true);
		changed = true;
	} else if (innerWidth >= 850 && changed) {
		view.changeToAdaptive('tag-block__adaptive', 'news-block__adaptive', 'tag-block', 'news-block', false);
		changed = false;
	}
});
