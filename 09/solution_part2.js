import * as fs from 'fs';
import {rotateGrid, transpose} from "../helper/utils.js";

const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

function drawGrid(coordinates) {
    var minX = coordinates[0].x;
    var maxX = coordinates[0].x;
    var minY = coordinates[0].y;
    var maxY = coordinates[0].y;

    for (let i = 0; i < coordinates.length; i++) {
        let currentX = coordinates[i].x;
        let currentY = coordinates[i].y;

        if (currentX < minX) {
            minX = currentX;
        }
        if (currentX > maxX) {
            maxX = currentX;
        }
        if (currentY < minY) {
            minY = currentY;
        }
        if (currentY > maxY) {
            maxY = currentY;
        }
    }

    let width = maxX - minX + 1;
    let height = maxY - minY + 1;
    let grid = [];

    for (let i = 0; i < height; i++) {
        let row = [];
        for (let j = 0; j < width; j++) {
            let isCoordinate = false;
            for (let k = 0; k < coordinates.length; k++) {
                if (coordinates[k].x === j + minX && coordinates[k].y === i + minY) {
                    isCoordinate = true;
                    break;
                }
            }
            row.push(isCoordinate ? '#' : '-');
        }
        grid.push(row);
    }
    grid = rotateGrid(grid)
    grid = transpose(grid)
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(''));
    }
}

class AOCResult {
    constructor(value) {
        this.value = value;
    }
}

class Rope {
    constructor() {
        this.rope = [];
        for (let i = 0; i < 10; i++) {
            this.rope.push(new Pos(0, 0));
        }
        this.uniqueLoc = new Set();
        this.uniqueLoc.add(this.rope[9].x + ',' + this.rope[9].y);
    }

    parseInput(input) {
        const lines = input.split(/\r?\n/);
        for (let line of lines) {
            const command = this.parseCommand(line);
            for (let i = 0; i < command.amount; i++) {
                this.rope[0].moveIn(command.dir);
                for (let j = 1; j < 10; j++) {
                    const prev = this.rope[j - 1];
                    this.rope[j].getPulledTo(prev);
                }
                this.uniqueLoc.add(this.rope[9].x + ',' + this.rope[9].y);
            }
        }
        //console.log(this.uniqueLoc)
        drawGrid(Array.from(this.uniqueLoc.values()).map(string => {
            const coordinates = string.split(",")
            return {x: Number(coordinates[0]), y: Number(coordinates[1]) }
        }))
        return new AOCResult(this.uniqueLoc.size);
    }

    parseCommand(line) {
        const dir = line.slice(0, 1).trim();
        const amount = line.slice(1).trim();
        let dirPos;
        switch (dir) {
            case 'U':
                dirPos = new Pos(0, 1);
                break;
            case 'D':
                dirPos = new Pos(0, -1);
                break;
            case 'L':
                dirPos = new Pos(-1, 0);
                break;
            case 'R':
                dirPos = new Pos(1, 0);
                break;
            default:
                throw new Error(`Tried to Parse ${dir} as direction`);
        }
        return {
            dir: dirPos,
            amount: parseInt(amount)
        }
    }
}

class Pos {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveIn(dir) {
        this.x += dir.x;
        this.y += dir.y;
    }

    getPulledTo(head) {
        const xDiff = head.x - this.x;
        const yDiff = head.y - this.y;
        if (Math.abs(xDiff) > 1 || Math.abs(yDiff) > 1) {
            this.x += Math.sign(xDiff);
            this.y += Math.sign(yDiff);
        }
    }
}

function solution_2(input) {
    const rope = new Rope();
    return rope.parseInput(input)
}

console.log(solution_2(fileContent))
