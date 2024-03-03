import test from 'ava';

import date from '../fixtures/date.js';
import {setAlarm, TOLERANCE} from '#module';

const {TOLERANCE_LEFT, TOLERANCE_RIGHT} = TOLERANCE;

const macro = async (t, delay) => {
	const expected = date(delay);
	const triggeredAt = await new Promise((resolve) => {
		const cb = () => resolve(new Date());
		setAlarm(cb, expected);
	});

	const delta = triggeredAt - expected;

	t.true(
		delta >= TOLERANCE_LEFT,
		`TOLERANCE_LEFT: ${delta} >= ${TOLERANCE_LEFT}`,
	);

	t.true(
		delta <= TOLERANCE_RIGHT,
		`TOLERANCE_RIGHT: ${delta} <= ${TOLERANCE_RIGHT}`,
	);
};

macro.title = (title, delay) =>
	title ?? `setAlarm(cb, new Date(now + ${delay}))`;

test(macro, 0);
test(macro, 1);
test(macro, 333);
test(macro, 1000 - 1);
test(macro, 1000);
test(macro, 1000 + 1);
test(macro, 2000);
test(macro, 10_000 - 1);
test(macro, 10_000);
test(macro, 10_000 + 1);
