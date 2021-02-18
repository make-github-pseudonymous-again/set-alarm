import {TOLERANCE_LEFT} from './TOLERANCE.js';
import Alarm from './Alarm.js';

// See:
//  - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#maximum_delay_value
//  - https://stackoverflow.com/questions/3468607/why-does-settimeout-break-for-large-millisecond-delay-values
const DELAY_MAX_FOR_SET_TIMEOUT = 2147483647;
const FACTOR_OVERTAKE = 0.1; // We try to be ahead of the event by that much.
const FACTOR_COMPLETION = 1 - FACTOR_OVERTAKE;
const THRESHOLD_DRIFT = 100; // We assume no drift that large will ever occur.
const THRESHOLD_FINAL_COUNTDOWN = THRESHOLD_DRIFT / FACTOR_OVERTAKE;

/**
 * Set an alarm to trigger at a given date/time specified by a Date object.
 * When triggered, the alarm will call the callback function with passed
 * arguments, if any.
 *
 * We guarantee that the alarm will not trigger before the given date/time.
 * We try to trigger the alarm as soom as the given date/time has passed.
 *
 * Note that we workaround two issues raised by a naive setTimeout
 * implementation:
 *   1. the delay parameter is a 32-bit signed integer
 *   2. taking the first point into account, the resolution time of setAlarm
 *   could be imprecise with large delays (because of setInterval/setTimeout
 *   drift).
 *
 * @param {Function} callback - The Function to call when the alarm triggers.
 * @param {Date} date - The date/time at which to trigger the alarm.
 * @param {...any} rest - The arguments to call the callback with.
 * @returns {Alarm} The alarm object.
 */
export default function setAlarm(callback, date, ...rest) {
	const delay = () => date - Date.now();
	const alarm = new Alarm();

	const iter = () => {
		const _delay = delay();
		if (_delay >= THRESHOLD_FINAL_COUNTDOWN) {
			const step = Math.min(
				DELAY_MAX_FOR_SET_TIMEOUT,
				_delay * FACTOR_COMPLETION,
			);
			alarm.record(setTimeout(iter, step));
		} else if (_delay > -TOLERANCE_LEFT) {
			// We make sure to queue the final callback only if we respect the
			// left tolerance
			alarm.record(setTimeout(iter, _delay));
		} else {
			// Here we recompute delay() to get the most accurate delay for the
			// last setTimeout call.
			alarm.record(setTimeout(callback, delay(), ...rest));
		}
	};

	alarm.record(setTimeout(iter, 0));
	return alarm;
}
