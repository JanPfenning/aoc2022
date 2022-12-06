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

input.forEach((_, index) => {
    if(!duplicateInSlidingWindow(
        Array.from(Array(14).keys()).map(element => input[index-element]))
    )
        console.log(index+1)
})
//1779
//2635