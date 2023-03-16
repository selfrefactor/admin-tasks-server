import { of } from 'rxjs';
import { filter,map } from 'rxjs/operators';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

test('happy', () => {
    const result$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
      filter(n => n % 2 !== 0),
      map(x => x * 10)
    );

    const observerSpy = subscribeSpyTo(result$);
        console.log(observerSpy.getValues());
        
    expect(observerSpy.getValues()).toEqual([10, 30, 50, 70, 90]);

})
