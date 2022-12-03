import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const findDuplicates = (string1, string2) => string2.split("").filter(char => string1.split("").includes(char))
const getPriorityOfChar = (char) => char.charCodeAt(0) < 91 ? char.charCodeAt(0)-65+27 : char.charCodeAt(0)-96

const sum_of_priorities = fileContent.split(/\r?\n/)
    .map(row => [row.slice(0, row.length/2), row.slice(row.length/2)])
    .map(([string1, string2]) => [
        string1.split("").sort().join(""),
        string2.split("").sort().join("")
    ])
    .map(([string1, string2]) => findDuplicates(string1, string2)[0])
    .map(char => getPriorityOfChar(char))
    .reduce((sum, value) => sum+value);

console.log(sum_of_priorities);

const sum_of_group_priorities = fileContent
    .match(/(([a-z]|[A-Z])*(\r?\n)?){3}/g)
    .map(group => group.split(/\r?\n/))
    .filter(group => group[0] && group[1] && group[2])
    .map(([line1, line2, line3]) => [
        line1.split("").sort().join(""),
        line2.split("").sort().join(""),
        line3.split("").sort().join(""),
    ])
    .map(([line1, line2, line3]) => findDuplicates(line1, line2).filter(duplicate => findDuplicates(duplicate, line3).length>0)[0])
    .map(char => getPriorityOfChar(char))
    .reduce((sum, value) => sum+value);

console.log(sum_of_group_priorities)