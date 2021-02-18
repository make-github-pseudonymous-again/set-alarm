import Alarm from './Alarm.js';

/**
 * Prevents an alarm from triggering. Obviously, this does not work if the
 * alarm has triggered before calling `clearAlarm`. However, it is guaranteed
 * that if `clearAlarm` is called before `alarm` has triggered, `alarm` will
 * never trigger.
 *
 * Does nothing on invalid arguments (it will not throw).
 *
 * @param {Alarm} alarm - The alarm to clear.
 */
export default function clearAlarm(alarm) {
	if (alarm instanceof Alarm) {
		alarm.clear();
	}
}
