import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const input = fileContent.split("")
const duplicateInSlidingWindow = (slidingWindow) => {
    for (let i = 0; i < slidingWindow.length; i++) {
        if(slidingWindow.filter(element => element === slidingWindow[i]).length>1) return true
    }
    return false;
}
const windowSize = 14 //4
const result = input.map((element, index) => [element, index]).filter((_, index) =>
    index>windowSize && !duplicateInSlidingWindow(Array.from(Array(windowSize).keys()).map(element => input[index-element]))
).map(([element, index]) => index+1)[0]
console.log(result)
//1779
//2635