'use strict';

(function(){

	// const MainBar = window.MainBar;
	// const Content = window.Content;
	//
	// let mainBar = new MainBar();
	// let content = new Content();

	const MainView = window.MainView;
	//const NewForm = window.NewForm;

	//let newsForm = new NewForm();
	let view = new MainView();
	view.getCategories();
	view.setNews();

})();
