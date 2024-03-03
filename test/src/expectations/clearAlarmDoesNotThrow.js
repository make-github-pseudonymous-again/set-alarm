import test from 'ava';

import {clearAlarm} from '#module';

const clearAlarmDoesNotThrow = (t, target) => {
	t.notThrows(() => {
		clearAlarm(target);
	});
};

clearAlarmDoesNotThrow.title = (title, target) =>
	title ??
	`clearAlarm(${target?.toString() || JSON.stringify(target)}) does not throw`;

test(clearAlarmDoesNotThrow, undefined);
test(clearAlarmDoesNotThrow, null);
test(clearAlarmDoesNotThrow, 0);
test(clearAlarmDoesNotThrow, -1);
test(clearAlarmDoesNotThrow, '');
test(clearAlarmDoesNotThrow, 'abracadabra');
test(clearAlarmDoesNotThrow, []);
test(clearAlarmDoesNotThrow, {});
test(clearAlarmDoesNotThrow, /regexp/);
test(clearAlarmDoesNotThrow, new Date());
