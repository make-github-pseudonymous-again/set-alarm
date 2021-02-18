export default class Alarm {
	constructor(handle) {
		this._handle = handle;
	}

	record(handle) {
		// NB: This works even if this._handle was created with setInterval.
		// See: https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
		clearTimeout(this._handle);
		this._handle = handle;
	}

	clear() {
		this.record(undefined);
	}
}
