import * as fs from 'fs';
import {correctOrder} from "./Pair";

const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const stringPairs = fileContent.split(/(\r?\n){2}/).filter((_, index) => index % 2 === 0)
const packagePairs = stringPairs.map(pair => pair.split(/\r?\n/)).map(([left, right]) => [JSON.parse(left), JSON.parse(right)])
const evaluation = packagePairs.map(([leftPackage, rightPackage]) => {
    const result = correctOrder(leftPackage, rightPackage);
    if (typeof result === 'boolean')
        return result
    else return [leftPackage, rightPackage]
})
const result = evaluation.map((x, index) => x === true ? index + 1 : false)
console.log(result.filter(element => element !== false).reduce((sum: number, value: number) => sum+value))
// 5852

/*
* Part 2
* */

const packages = fileContent.split(/(\r?\n)/).filter(element => !!!element.match(/\r?\n/) && element !== '').map((line) => JSON.parse(line)).sort((package1, package2) => correctOrder(package1, package2) === true ? -1 : 1)
const pos2 = packages.findIndex((element) => JSON.stringify(element) === JSON.stringify([[2]]))+1
const pos6 = packages.findIndex((element) => JSON.stringify(element) === JSON.stringify([[6]]))+1
console.log(pos2, pos6, pos2*pos6)
