export default function setAlarm (callback, date, ...rest) {
	const delay = date - new Date();
	return setTimeout(callback, delay, ...rest);
}
