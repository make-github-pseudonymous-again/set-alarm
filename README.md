:alarm_clock: [set-alarm](https://aureooms.github.io/set-alarm)
==

Call a `Function` on a given `Date`.
The API tries to mimic [the `setTimeout` API](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) as best as possible.
See [docs](https://aureooms.github.io/set-alarm/index.html).

```js
import {
	setAlarm,
	clearAlarm,
	Alarm
} from 'set-alarm';

const firstOfApril2021AtNoonZuluTime = new Date('2021-04-01T12:00Z');

// Set an alarm
const alarm = setAlarm(() => {
	console.debug(new Date() - firstOfApril2021AtNoonZuluTime);
}, firstOfApril2021AtNoonZuluTime);

alarm instanceof Alarm; // true

// Two scenarios:
//  - if date is in the future: should trigger at or just after the date, logging a small nonnegative number
//  - if date is in the past: will trigger anyway logging a possibly large positive number
// It is up to you to ignore alarms for past dates (similar to `setTimeout(..., -2389324)`).

// OR Unenroll the callback (and the alarm will not trigger)
clearAlarm(alarm); // undefined
```

[![License](https://img.shields.io/github/license/aureooms/set-alarm.svg)](https://raw.githubusercontent.com/aureooms/set-alarm/main/LICENSE)
[![Version](https://img.shields.io/npm/v/set-alarm.svg)](https://www.npmjs.org/package/set-alarm)
[![Build](https://img.shields.io/travis/aureooms/set-alarm/main.svg)](https://travis-ci.org/aureooms/set-alarm/branches)
[![Dependencies](https://img.shields.io/david/aureooms/set-alarm.svg)](https://david-dm.org/aureooms/set-alarm)
[![Dev dependencies](https://img.shields.io/david/dev/aureooms/set-alarm.svg)](https://david-dm.org/aureooms/set-alarm?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/aureooms/set-alarm.svg)](https://github.com/aureooms/set-alarm/issues)
[![Downloads](https://img.shields.io/npm/dm/set-alarm.svg)](https://www.npmjs.org/package/set-alarm)

[![Code issues](https://img.shields.io/codeclimate/issues/aureooms/set-alarm.svg)](https://codeclimate.com/github/aureooms/set-alarm/issues)
[![Code maintainability](https://img.shields.io/codeclimate/maintainability/aureooms/set-alarm.svg)](https://codeclimate.com/github/aureooms/set-alarm/trends/churn)
[![Code coverage (cov)](https://img.shields.io/codecov/c/gh/aureooms/set-alarm/main.svg)](https://codecov.io/gh/aureooms/set-alarm)
[![Code technical debt](https://img.shields.io/codeclimate/tech-debt/aureooms/set-alarm.svg)](https://codeclimate.com/github/aureooms/set-alarm/trends/technical_debt)
[![Documentation](https://aureooms.github.io/set-alarm/badge.svg)](https://aureooms.github.io/set-alarm/source.html)
[![Package size](https://img.shields.io/bundlephobia/minzip/set-alarm)](https://bundlephobia.com/result?p=set-alarm)
