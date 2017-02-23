'use strict';

(function(){

	const Block = window.Block;

	class Button extends Block {
		constructor(text, attrs){
			super('button', attrs);
			this.get().innerHTML = text;
		}
	}

	window.Button = Button;
})();

