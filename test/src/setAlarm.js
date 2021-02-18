import test from 'ava';

import date from '../fixtures/date.js';
import {setAlarm, TOLERANCE} from '../../src/index.js';

const {TOLERANCE_LEFT, TOLERANCE_RIGHT} = TOLERANCE;

const macro = (t, delay) => {
	const check = () => {
		const triggeredAt = new Date();
		const delta = triggeredAt - expected;
		t.true(
			delta >= TOLERANCE_LEFT,
			`TOLERANCE_LEFT: ${delta} >= ${TOLERANCE_LEFT}`,
		);
		t.true(
			delta <= TOLERANCE_RIGHT,
			`TOLERANCE_RIGHT: ${delta} <= ${TOLERANCE_RIGHT}`,
		);
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
test.cb(macro, 1000 - 1);
test.cb(macro, 1000);
test.cb(macro, 1000 + 1);
test.cb(macro, 2000);
test.cb(macro, 10000 - 1);
test.cb(macro, 10000);
test.cb(macro, 10000 + 1);
