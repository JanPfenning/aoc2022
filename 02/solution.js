import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');
const rps = [
    [['R', 'R', 3+1], ['R', 'P', 6+2], ['R', 'S', 0+3]],
    [['P', 'R', 0+1], ['P', 'P', 3+2], ['P', 'S', 6+3]],
    [['S', 'R', 6+1], ['S', 'P', 0+2], ['S', 'S', 3+3]],
]
const mapElfMove = new Map([
    ['A', 0],
    ['B', 1],
    ['C', 2],
])
const mapMyMove = new Map([
    ['X', 0],
    ['Y', 1],
    ['Z', 2],
])
const mappedPointsToEachRound = fileContent.split(/\r?\n/)
    .map(round =>
        rps[mapElfMove.get(round.at(0))][mapMyMove.get(round.at(2))][2]
    )
console.log(mappedPointsToEachRound.reduce((sum, value) => sum+value))

/*
* Part two (X means you need to lose, Y means need to Draw and Z means need to Win
* if you need to lose, you have to shift the elfes move by 2
* draw is no shift
* win is one shift
* */

const mapExpectedOutcomeToShiftAmount = new Map([
    ['X', 2],
    ['Y', 0],
    ['Z', 1]
])
const getMyMove = (elfMove, expectedOutcome) =>
    (mapElfMove.get(elfMove) + mapExpectedOutcomeToShiftAmount.get(expectedOutcome)) % 3
const mappedPointsToEachRoundPart2 = fileContent.split(/\r?\n/)
    .map(round =>
        rps[mapElfMove.get(round.at(0))][getMyMove(round.at(0), round.at(2))][2]
    )
console.log(mappedPointsToEachRoundPart2.reduce((sum, value)=> sum+value))