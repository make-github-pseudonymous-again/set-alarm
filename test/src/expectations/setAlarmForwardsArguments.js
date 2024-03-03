import test from 'ava';

import date from '../../fixtures/date.js';

import {setAlarm} from '#module';

const macro = async (t, delay) => {
	const expected = [Math.random(), Math.random(), Math.random()];

	const actual = await new Promise((resolve) => {
		const cb = (...args) => resolve(args);
		setAlarm(cb, date(delay), ...expected);
	});

	t.deepEqual(actual, expected);
};

macro.title = (title, delay) =>
	title ?? `setAlarm(..., new Date(now + ${delay}), ...args) forwards args`;

test(macro, -999);
test(macro, 0);
test(macro, 1);
test(macro, 333);
test(macro, 1000);
test(macro, 2000);
test(macro, 10_000);
