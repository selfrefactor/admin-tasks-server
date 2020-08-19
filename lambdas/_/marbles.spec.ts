import {cold, hot, time} from 'jest-marbles';
import {merge} from 'rxjs/operators'

test('Should merge two hot observables and start emitting from the subscription point', () => {
  const e1 = hot('----a--^--b-------c--|', {a: 0});
  const e2 = hot('  ---d-^--e---------f-----|', {a: 0});
  const expected = cold('---(be)----c-f-----|', {a: 0});

  expect(e1.pipe(merge(e2))).toBeObservable(expected);
});