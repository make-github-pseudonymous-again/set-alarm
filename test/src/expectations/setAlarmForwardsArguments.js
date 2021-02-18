import test from 'ava';

import date from '../../fixtures/date.js';
import {setAlarm} from '../../../src/index.js';

const macro = (t, delay) => {
	const check = (...args) => {
		t.deepEqual(args, expected);
		t.end();
	};

	const expected = [Math.random(), Math.random(), Math.random()];
	setAlarm(check, date(delay), ...expected);
};

macro.title = (title, delay) =>
	title ?? `setAlarm(..., new Date(now + ${delay}), ...args) forwards args`;

test.cb(macro, -999);
test.cb(macro, 0);
test.cb(macro, 1);
test.cb(macro, 333);
test.cb(macro, 1000);
test.cb(macro, 2000);
test.cb(macro, 10000);
