/**
 * The type returned by setAlarm.
 */
export default class Alarm {
	/**
	 * Construct an Alarm given a setTimeout handle.
	 *
	 * @param {any} handle
	 */
	constructor(handle) {
		this._handle = handle;
	}

	/**
	 * Record a new setTimeout handle (and clear previous one if any).
	 *
	 * @param {any} handle
	 */
	record(handle) {
		// NB: This works even if this._handle was created with setInterval.
		// See: https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
		clearTimeout(this._handle);
		this._handle = handle;
	}

	/**
	 * Clear last setTimeout handle.
	 */
	clear() {
		this.record(undefined);
	}
}
