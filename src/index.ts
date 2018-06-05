
function memoize(resolver?:Function) {
    return (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) => {
        let func:Function = descriptor.value;

        const memoized:any = (...args:any[]): any => {
            const key = resolver ? resolver.apply(target, args) : args[0];
            const cache = memoized.cache;

            if(cache.has(key)) return cache.get(key);

            const result = func.apply(target, args);
            memoized.cache = cache.set(key, result) || cache;
            return result;
        }

        memoized.cache = new Map<any,any>();
        descriptor.value = memoized;
    }
}

export { memoize };