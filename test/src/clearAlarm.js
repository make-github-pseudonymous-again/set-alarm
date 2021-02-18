import test from 'ava';

import date from '../fixtures/date.js';
import {setAlarm, clearAlarm} from '../../src/index.js';

const FACTOR_RACE = 1.1;

const macro = (t, delay) => {
	const trigger = () => {
		t.fail();
		t.end();
	};

	const alarm = setAlarm(trigger, date(delay));

	const clear = () => {
		clearAlarm(alarm);
	};

	const clearDelay = Math.trunc(delay / FACTOR_RACE);
	if (clearDelay === 0) clear();
	else setTimeout(clear, clearDelay);

	const check = () => {
		t.pass();
		t.end();
	};

	setTimeout(check, delay * FACTOR_RACE);
};

macro.title = (title, delay) =>
	title ?? `clearAlarm(setAlarm(..., now + ${delay})) [delayed]`;

test.cb(macro, 0);
test.cb(macro, 1);
test.cb(macro, 333);
test.cb(macro, 1000);
test.cb(macro, 2000);
test.cb(macro, 10000);
