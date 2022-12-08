import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const fileInput = fileContent.split(/\r?\n/)
const matrix = []
fileInput.forEach(line => matrix.push(line.split("").map(element => Number(element))))
console.log(matrix)

const transposeMatrix = (matrix) => {
    // initialize an empty array to store the transposed matrix
    let transposedMatrix = [];

    // loop through the matrix
    for (let i = 0; i < matrix.length; i++) {
        // loop through the matrix
        for (let j = 0; j < matrix[i].length; j++) {
            // if the transposed matrix does not have a row at the current index,
            // create a new row
            if (!transposedMatrix[j]) {
                transposedMatrix[j] = [];
            }
            // insert the current value from the matrix into the transposed matrix
            transposedMatrix[j][i] = matrix[i][j];
        }
    }
    // return the transposed matrix
    return transposedMatrix;
}

//Solution

function visibleTrees(matrix) {
    let visibleTrees = [];

    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            // check if there is no tree in the same row with smaller index is heigher
            let isVisibleRowLeft = true;
            for (let i = 0; i < col; i++) {
                if (matrix[row][i] >= matrix[row][col]) {
                    isVisibleRowLeft = false;
                    break;
                }
            }
            // check if there is no tree in the same column with smaller index is heigher
            let isVisibleColUp = true;
            for (let i = 0; i < row; i++) {
                if (matrix[i][col] >= matrix[row][col]) {
                    isVisibleColUp = false;
                    break;
                }
            }
            // check if there is no tree in the same row with bigger index is heigher
            let isVisibleRowRight = true;
            for (let i = col + 1; i < matrix[row].length; i++) {
                if (matrix[row][i] >= matrix[row][col]) {
                    isVisibleRowRight = false;
                    break;
                }
            }
            // check if there is no tree in the same column with bigger index is heigher
            let isVisibleColDown = true;
            for (let i = row + 1; i < matrix.length; i++) {
                if (matrix[i][col] >= matrix[row][col]) {
                    isVisibleColDown = false;
                    break;
                }
            }

            if (isVisibleRowLeft || isVisibleColUp || isVisibleRowRight || isVisibleColDown) {
                visibleTrees.push([row, col]);
            }
        }
    }

    return visibleTrees;
}

// part 1
console.log(visibleTrees(matrix).length);


// Part 2

// Define the function
function countTrees(coord, matrix) {

    // Find the height of the tree at the input coordinate
    let height = matrix[coord[0]][coord[1]];

    let countNorth = 0;
    // Iterate over the row above the input coordinate
    for (let i = coord[0] - 1; i >= 0; i--) {

        // If the height of the tree is less than or equal to the tree at the input coordinate, increment the count
        if (matrix[i][coord[1]] <= height) {
            countNorth++;
        }
        // If the height of the tree is greater than the tree at the input coordinate, stop searching in this direction
        if (matrix[i][coord[1]] >= height) {
            break;
        }
    }

    let countEast = 0;
    // Iterate over the row below the input coordinate
    for (let i = coord[0] + 1; i < matrix.length; i++) {

        // If the height of the tree is less than or equal to the tree at the input coordinate, increment the count
        if (matrix[i][coord[1]] <= height) {
            countEast++;
        }
        // If the height of the tree is greater than the tree at the input coordinate, stop searching in this direction
        if (matrix[i][coord[1]] >= height) {
            break;
        }
    }

    let countWest = 0;
    // Iterate over the column to the left of the input coordinate
    for (let j = coord[1] - 1; j >= 0; j--) {

        // If the height of the tree is less than or equal to the tree at the input coordinate, increment the count
        if (matrix[coord[0]][j] <= height) {
            countWest++;
        }
        // If the height of the tree is greater than the tree at the input coordinate, stop searching in this direction
        if (matrix[coord[0]][j] >= height) {
            break;
        }
    }

    let countSouth = 0;
    // Iterate over the column to the right of the input coordinate
    for (let j = coord[1] + 1; j < matrix[0].length; j++) {

        // If the height of the tree is less than or equal to the tree at the input coordinate, increment the count
        if (matrix[coord[0]][j] <= height) {
            countSouth++;
        }
        // If the height of the tree is greater than the tree at the input coordinate, stop searching in this direction
        if (matrix[coord[0]][j] >= height) {
            break;
        }
    }

    // Return the output
    return countSouth*countWest*countEast*countNorth;
}

//Part 2 solution
console.log(visibleTrees(matrix).map(treeCoordinate => [treeCoordinate, countTrees(treeCoordinate, matrix)]).sort((a,b) => b[1]-a[1]))
