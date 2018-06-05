import {memoize} from '../src';


class memoizeTest {
    
    //Testing using memoize on a function that has multiple arguments, this wants a resolver
    @memoize((...args: any[]) => args.join('_'))
    sum(a: number, b: number): number { return a + b; }

    //Verify that memoize even works properly, providing a slower call, compare its time to execute vs a memoized version
    fibSlow(a: number): number {
        if(a > 1) return this.fibSlow(a-1) + this.fibSlow(a-2);
        return 1;
    }

    // This is the memoized version for the speed test
    @memoize()
    fib(a: number): number {
        if(a > 1) return this.fib(a-1) + this.fib(a-2);
        return 1;
    }
}

test('memoize a simple sum', () => {
    let t = new memoizeTest();
    expect( t.sum(1,2) ).toBe(3);
});

test('memoized fib should be faster', () => {
    let t = new memoizeTest();
    expect(t.fib(30)).toBe(1346269);
})


test('unmemoized fib should be slower', () => {
    let t = new memoizeTest();
    expect(t.fibSlow(30)).toBe(1346269);
})