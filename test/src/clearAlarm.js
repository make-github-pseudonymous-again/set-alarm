import test from 'ava';

import date from '../fixtures/date.js';

import {setAlarm, clearAlarm} from '#module';

const FACTOR_RACE = 1.1;

const macro = async (t, delay) => {
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

	await t.notThrowsAsync(
		new Promise((resolve, reject) => {
			const cb = () => {
				try {
					clear(); // Checks that clearing twice does not throw.
				} catch (error) {
					reject(error);
				}

				resolve();
			};

			setTimeout(cb, delay * FACTOR_RACE);
		}),
	);
};

macro.title = (title, delay) =>
	title ?? `clearAlarm(setAlarm(..., now + ${delay})) [delayed]`;

test(macro, 0);
test(macro, 1);
test(macro, 333);
test(macro, 1000);
test(macro, 2000);
test(macro, 10_000);
