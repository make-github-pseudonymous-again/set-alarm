import test from 'ava';

import {setAlarm} from '../../src/index.js';

const TOLERANCE = 10; // 10 ms
const closeEnough = (a, b) => Math.abs(a - b) <= TOLERANCE;
const date = (delay) => new Date(Date.now() + delay);

const macro = (t, delay) => {
	const check = () => {
		const triggeredAt = new Date();
		t.true(closeEnough(triggeredAt, expected));
		t.end();
	};

	const expected = date(delay);
	setAlarm(check, expected);
};

macro.title = (title, delay) =>
	title ?? `setAlarm(cb, new Date(now + ${delay}))`;

test.cb(macro, 0);
test.cb(macro, 1);
test.cb(macro, 333);
test.cb(macro, 1000);
test.cb(macro, 2000);
test.cb(macro, 10000);
