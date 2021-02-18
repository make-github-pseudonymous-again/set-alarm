import Alarm from './Alarm.js';

// See:
//  - https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#maximum_delay_value
//  - https://stackoverflow.com/questions/3468607/why-does-settimeout-break-for-large-millisecond-delay-values
const DELAY_MAX = 2147483647;

/**
 * We workaround two issues raised by a naive setTimeout implementation:
 *   - the delay parameter is a 32-bit signed integer
 *   - TODO the resolution time of setAlarm could be imprecise with large delays
 */
export default function setAlarm(callback, date, ...rest) {
	const remaining = () => date - Date.now();
	const delay = Math.max(remaining(), 0);
	const delayStep = DELAY_MAX; // TODO depending on remaining() for precision?
	const steps = delay / delayStep;
	let step = Math.trunc(steps);
	const finalCountDown = () => setTimeout(callback, remaining(), ...rest);
	if (step === 0) return new Alarm(finalCountDown());

	const alarm = new Alarm();
	const iter = () => {
		if (--step === 0) {
			alarm.record(finalCountDown());
		}
	};

	alarm.record(setInterval(iter, delayStep));
	return alarm;
}
