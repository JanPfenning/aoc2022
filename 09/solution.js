import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const line = fileContent.split(/\r?\n/)
const headInstructions = line.map(line => {
    const lineInformation = line.split(" ")
    return {direction: lineInformation[0], length: Number(lineInformation[1])}
})
//headInstructions.forEach(({direction: direction, length: length}) => console.log(`Moving ${length} steps facing ${direction}`))

const map = {
    headPosition: {x: 0, y: 0},
    tailPosition: {x: 0, y: 0},
    visited: new Map(),

    moveHead: function({direction: direction, length: length}){
        if(length === 0) return;
        this.headPosition = (
            direction === 'D'
            ? {x: this.headPosition.x, y: this.headPosition.y - 1}
            : (direction === 'U'
            ? {x: this.headPosition.x, y: this.headPosition.y + 1}
            : (direction === 'L'
            ? {x: this.headPosition.x - 1, y: this.headPosition.y}
            : (direction === 'R'
            ? {x: this.headPosition.x + 1, y: this.headPosition.y}
            : {x: this.headPosition.x, y: this.headPosition.y})))
        )
        this._followTail(direction)
        this.moveHead({direction: direction, length: length-1})
    },

    _followTail: function(direction){
        if(this.isAdjacent(this.headPosition, this.tailPosition)) return;
        this.tailPosition = (
            direction === 'D'
            ? {x: this.headPosition.x, y: this.headPosition.y + 1}
            : direction === 'U'
            ? {x: this.headPosition.x, y: this.headPosition.y - 1}
            : direction === 'L'
            ? {x: this.headPosition.x + 1, y: this.headPosition.y}
            : direction === 'R'
            ? {x: this.headPosition.x - 1, y: this.headPosition.y}
            : {x: this.headPosition.x, y: this.headPosition.y}
        )
        this.visit(this.tailPosition);
    },

    isAdjacent: function({x: x1, y: y1}, {x: x2, y: y2}){
        return (
                Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 0)
            || (Math.abs(x1 - x2) === 0 && Math.abs(y1 - y2) === 1)
            || (Math.abs(x1 - x2) === 1 && Math.abs(y1 - y2) === 1)
            || (Math.abs(x1 - x2) === 0 && Math.abs(y1 - y2) === 0); // H on top of T
    },

    visit: function({x: x, y: y}){
        const coordinateKey = ''+x+','+y;
        if (this.visited.has(coordinateKey)) {
            let value = this.visited.get(coordinateKey);
            this.visited.set(coordinateKey, value + 1);
        } else {
            this.visited.set(coordinateKey, 1);
        }
    }
};

headInstructions.forEach(headInstruction => {
    map.moveHead(headInstruction)
})
const result = Array.from(map.visited.entries())//.reduce((sum, [key, value]) => sum+value, 0)
console.log(result.length+1)

// 6036 too low
// 6243 too high - and answer of someone else? lol never tell me the odds
// 6305 too high