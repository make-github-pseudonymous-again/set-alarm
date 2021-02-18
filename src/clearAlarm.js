import Alarm from './Alarm.js';

export default function clearAlarm(alarm) {
	if (alarm instanceof Alarm) {
		alarm.clear();
	} else {
		throw new TypeError('clearAlarm expects and Alarm object');
	}
}
