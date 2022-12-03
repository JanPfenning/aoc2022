import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const printCalories = (listOfCalories) => {
    console.log("-----------")
    console.log(listOfCalories)
}

const getCalories = (listOfCalories) => {
    console.log("-----------")
    console.log(listOfCalories)
}

fileContent.split(/\r?\n\r?\n/).forEach(elf => printCalories(elf.split(/\r?\n/)))
const result = fileContent.split(/\r?\n\r?\n/).map(elf => elf.split(/\r?\n/).map(string => Number(string)).reduce((sum, value) => sum+value))

console.log(result)
console.log(Math.max(...result))

console.log(result.sort().reverse().slice(0,3))
console.log(result.sort().reverse().slice(0,3).reduce((sum, value) => sum+value))