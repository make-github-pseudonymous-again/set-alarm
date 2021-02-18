export default class Alarm {
	constructor(handler) {
		this._handler = handler;
	}

	record(handler) {
		if (this._handler) {
			// NB: This works even if this._handler was created with setInterval.
			// See: https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
			clearTimeout(this._handler);
		}

		this._handler = handler;
	}

	clear() {
		this.record(undefined);
	}
}
