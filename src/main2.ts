function work(a: number, c: number, b?: number): number {
    if (b) return b;
    return a + c;

function work2(a: number, c: number): number {
    return a + c;
}

const spy = (func: (...args: unknown[]) => unknown): SpyFunction<number> => {
    function wrapper(...args: unknown[]): unknown {
        wrapper.calls.push(args);
        return func(args);
    }
        wrapper.calls = [];
    return wrapper;
};
interface SpyFunction<T>{
    id?: string,
    (...args: unknown[]): unknown,
    calls?: T[][],
}

const spyWork = spy(work);
const spyWork2 = spy(work2);
spyWork2(1, 2);
spyWork(1, 2); // 3
spyWork(4, 5); // 9

for (const args of spyWork.calls) {
    console.log(args.join());
}

///remove dupl
function removeDuplicates(nums: number[]): number[] {
    const cache = new Map();
    const result = [];
    let counter = 0;

    for(let i = 0; i < nums.length; i++) {
        if (cache.has(nums[i])) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            counter++;
        } else {
            cache.set(nums[i], nums[i]);
            result.push(nums[i]);
        }
    }

    return result;
}


const input = [0,0,1,1,1,2,2,3,3,4];

console.log(removeDuplicates(input));

const obj = {
    name: 'kirill',
    getName(): void {
        setTimeout(function () {
            console.log(this);
        }, 1000);
        this.name = 'sasha';
    }
};

obj.getName();
