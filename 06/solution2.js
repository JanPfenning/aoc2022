import * as fs from 'fs';
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const slidingWindow = (str, windowSize) => {
    let s = new Set();
    let start = 0;
    let end = 0;

    while(end < str.length) {
        let char = str.charAt(end);
        if(!s.has(char)) {
            s.add(char);
            end++;
        } else {
            s.delete(str.charAt(start));
            start++;
        }
        if(s.size===windowSize) return start+windowSize
    }
    return -1;
}

console.log(slidingWindow(fileContent, 14));