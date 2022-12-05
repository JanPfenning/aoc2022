import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const includingPairs = fileContent.split(/\r?\n/)
includingPairs.forEach(line => console.log(line))