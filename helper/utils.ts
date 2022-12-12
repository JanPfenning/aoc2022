export const getOneInstanceOfEachDuplicatedElement = list => {
    let result = [];
    list.forEach(element => {
        if (list.filter(x => x === element).length >= 2) {
            if (!result.includes(element)) {
                result.push(element);
            }
        }
    });
    return result;
};
export const readGrid = (multiLineString: string) => multiLineString.split(/\r?\n/).map(line => line.split(''))
export const transpose = grid => grid[0].map((_, i) => grid.map(row => row[i]));
export const rotateGrid = grid => grid[0].map((_, i) => grid.map(x => x[i]).reverse());
export const mirrorHorizontally = (grid) => grid.map((row,y) => row.map((col,x) => grid[y][grid[y].length - x - 1]));
export const mirrorVertically = (grid) => grid.map((row,y) => row.map((col,x) => grid[grid.length - y - 1][x]));
export const rotate180 = grid => grid.reverse().map(row => row.reverse());

export const greatestCommonDivisor = (numbers: number[]) => numbers.reduce((prev, current) => gcdHelper(prev, current));
export const leastCommonMultiple = (numbers: number[]) => numbers.reduce((prev, current) => lcmHelper(prev, current));

const gcdHelper = (a: number, b: number): number => b ? gcdHelper(b, a % b) : a;
const lcmHelper = (a: number, b: number): number => a === 0 || b === 0 ? 1 : (a * b) / gcdHelper(a, b);

export const checkEquivalenceInAllRestClasses = (restClasses, num1, num2) => restClasses.every(rc => num1 % rc === num2 % rc);

export const getSmallestNumberGreaterZeroThatIsEquivalentToNInAllRestClasses = (n, restClasses) => {
    let m = 1;
    while (!checkEquivalenceInAllRestClasses(restClasses, n, m)) {
        if(m > n) return n
        m+=restClasses.filter(rc => n % rc === m % rc).reduce((sum, value) => sum*value, 1);
    }
    return m;
};
export const xor = (a, b) => (a || b) && !(a && b);
export const getPrimeFactors = (n: number): number[] => { let factors: number[] = [], d = 2; while (n > 1) { while (n % d === 0) { factors.push(d); n /= d; } d++; } return factors; }