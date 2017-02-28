'use strict';

import Block from '../block/block';

export default class Button extends Block {
	constructor(text, attrs) {
		super('button', attrs);
		this.get().innerHTML = text;
	}
}
