export const transpose = grid => grid[0].map((_, i) => grid.map(row => row[i]));
export const rotateGrid = grid => grid[0].map((_, i) => grid.map(x => x[i]).reverse());
export const mirrorHorizontally = (grid) => grid.map((row,y) => row.map((col,x) => grid[y][grid[y].length - x - 1]));
export const mirrorVertically = (grid) => grid.map((row,y) => row.map((col,x) => grid[grid.length - y - 1][x]));
export const rotate180 = grid => grid.reverse().map(row => row.reverse());
