import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const includingPairs = fileContent.split(/\r?\n/)
    .map(pairLine => pairLine.match(/\d*/g).filter(group => group).map(numberString => Number(numberString)))
    //.forEach(pair => console.log(pair))
    .filter(boundries => boundries[2]>=boundries[0] && boundries[3]<=boundries[1]
                      || boundries[0]>=boundries[2] && boundries[1]<=boundries[3])
    //.forEach(filtered => console.log(filtered))
    .length
console.log(includingPairs)

const overlappingPairs = fileContent.split(/\r?\n/)
    .map(pairLine => pairLine.match(/\d*/g).filter(group => group).map(numberString => Number(numberString)))
    //.forEach(pair => console.log(pair))
    .filter(boundries =>
           boundries[2] <= boundries[0] && boundries[0] <= boundries[3]
        || boundries[2] <= boundries[1] && boundries[1] <= boundries[3]
        || boundries[0] <= boundries[2] && boundries[2] <= boundries[1]
        || boundries[0] <= boundries[3] && boundries[3] <= boundries[1]
    )
    //.forEach(filtered => console.log(filtered))
    .length
console.log(overlappingPairs)