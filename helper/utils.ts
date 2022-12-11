export const transpose = grid => grid[0].map((_, i) => grid.map(row => row[i]));
export const rotateGrid = grid => grid[0].map((_, i) => grid.map(x => x[i]).reverse());
export const mirrorHorizontally = (grid) => grid.map((row,y) => row.map((col,x) => grid[y][grid[y].length - x - 1]));
export const mirrorVertically = (grid) => grid.map((row,y) => row.map((col,x) => grid[grid.length - y - 1][x]));
export const rotate180 = grid => grid.reverse().map(row => row.reverse());

export const leastCommonMultiple = (nums) => {
    // set the initial lcm to 1
    let lcm = 1

    // loop through the nums array
    for (let num of nums) {
        // update the lcm to the least common multiple of the current lcm and the current number
        lcm = lcm * num / gcd(lcm, num)
    }

    // return the lcm
    return lcm
}

// given two numbers a and b
// find the greatest common divisor of a and b
export const gcd = (a, b) => {
    while (b > 0) {
        let temp = b
        b = a % b
        a = temp
    }
    return a
}
