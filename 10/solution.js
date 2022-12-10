import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

let x = 1;
const cycles = [undefined]; //start at undefined to not mess with the 20th cycle being at index 19
const crt = [undefined]; //start at undefined to match cycles array

const getCrtPosition = () => (crt.length-1) % 40
const getSpritePos = () => cycles[cycles.length-1]
const pushCrtPixel = () => crt.push(Math.abs(getSpritePos() - getCrtPosition()) <= 1 ? '■' : ' ')

const addx = (V) => {
    cycles.push(x);
    pushCrtPixel();
    cycles.push(x);
    pushCrtPixel();
    x += V
}

const noop = () => {
    cycles.push(x);
    pushCrtPixel();
}

const instructionLinesAsString = fileContent.split(/\r?\n/)
instructionLinesAsString
    .map(instructionLineString =>
        instructionLineString === 'noop'
            ? {fun: noop, param: undefined}
            : {fun: addx, param: Number(instructionLineString.split(" ")[1])}
    ).forEach((command) => {
        command.fun(command.param)
    })

const cyclesOfInterest = new Set([20,60,100,140,180,220])
const part1 = cycles.map((cycle, index) => [cycle, index]).filter(([cycle, index]) => cyclesOfInterest.has(index)).map(([cycle, index]) => cycle * index).reduce((sum, value) => sum+value)
console.log(`solution to part1: ${part1}`)
console.log('-------------------------------')

const part2 = ([
    crt.slice(1,41),
    crt.slice(41,81),
    crt.slice(81,121),
    crt.slice(121,161),
    crt.slice(161,201),
    crt.slice(201,241),
])

part2.forEach(
    line => console.log(
        line.join('')
    )
)