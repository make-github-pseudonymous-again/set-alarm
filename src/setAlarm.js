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
 * We workaround two issues raised by a naive setTimeout implementation:
 *   - the delay parameter is a 32-bit signed integer
 *   - the resolution time of setAlarm could be imprecise with large delays
 *   (because of setInterval/setTimeout drift).
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
