import { merge } from 'rxjs/operators';
import {cold, hot, time} from 'jest-marbles'

test('happy', () => {
    const e1 = hot('----a--^--b-------c--|', {a: 0});
    const e2 = hot('  ---d-^--e---------f-----|', {a: 0});
    const expected = cold('---(be)----c-f-----|', {a: 0});

    expect(e1.pipe(merge(e2))).toBeObservable(expected);
})
