import test from 'ava';

import {setAlarm, TOLERANCE} from '../../src/index.js';

const date = (delay) => new Date(Date.now() + delay);

const macro = (t, delay) => {
	const check = () => {
		const triggeredAt = new Date();
		const delta = triggeredAt - expected;
		t.true(delta >= 0);
		t.true(delta <= TOLERANCE);
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
