'use strict';

(function(){

	const Block = window.Block;

	class Button extends Block {
		constructor(text, attrs){
			super('button', attrs);
			this.get().classList.add('create');
			this.get().innerHTML = text;
			//this.get().classList.add('')
		}
	}

	window.Button = Button;
})();

