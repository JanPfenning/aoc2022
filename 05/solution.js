import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const amountOfStacks = 9
const lines = fileContent.split(/(\r?\n){2}/)
const initStacksString = lines[0]
const instructionStrings = lines[2]
const stackLinesString = initStacksString.split(/\r?\n/).slice(0,amountOfStacks)
const stackLines = stackLinesString
    .map(line => line
        .replace(/\s/g, "")
        .replace(/[[\[\]]]/g, "-")
        .replace(/[\[\]]/g, "")
    ).map(line => line.split(""))
const transposedStack = stackLines.map((_, colIndex) => stackLines.map(row => row[colIndex]).reverse().filter(element => element !== "-"))

const moveXcratesFromNtoM = (numberOfCrates, sourceStack, destinationStack) => {
    const airStack = Array.from(Array(numberOfCrates).keys()).map(value => sourceStack.pop())//.reverse()
    //console.log(airStack)
    destinationStack.push(...airStack)
}
console.log("initial stacks:")
transposedStack.forEach((stackLine, index) => console.log(index, stackLine.join("")))
instructionStrings.split(/\r?\n/)
    .map(line => line
        .replace("move", "")
        .replace("from", "")
        .replace("to", "")
        .split(" ")
        .filter(value => value==="0"?"0":value)
        .map(value => Number(value))
    ).forEach(parameterList => {
        console.log(parameterList)
        moveXcratesFromNtoM(parameterList[0], transposedStack[parameterList[1]-1], transposedStack[parameterList[2]-1])
    })
//moveXcratesFromNtoM(3, transposedStack[0],transposedStack[1])
console.log(transposedStack.join("\n"))
console.log("VJSFHWGFT is result if crates are not revered on chaning pile\n" +
    "(switching one crate at a time - acutal pop one by one)")
console.log("LCTQFBVZV is result if crates are revered on chaning pile (switching a substack of crates at a time)")
console.log(transposedStack.map(stack => stack.pop()).join(""))