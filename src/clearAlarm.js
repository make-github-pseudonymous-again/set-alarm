import Alarm from './Alarm.js';

export default function clearAlarm(alarm) {
	if (alarm instanceof Alarm) {
		alarm.clear();
	}
}
