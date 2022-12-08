import * as fs from 'fs';

const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const lines = fileContent.split(/\r?\n/)
    .reverse()
    .filter(line => !line.startsWith('$ ls'))
    .filter(line => !line.startsWith('dir'))

// initialize global variables needed
const curDir = []
const directories = new Map([])

const cd = (line) => {
    line = line.replace('$ cd ', '')
    if(line === '..')
        curDir.pop()
    else{
        curDir.push(line)
        directories.set(curDir.join('/').replace('//', '/'), [])
    }
}

// Read the input commands
while(lines.length>0){
    const line = lines.pop();
    if(line.startsWith('$ cd ')){
        cd(line);
    }
    else{
        //console.log(`file ${line} to be put into dir ${curDir.join('/').replace('//', '/')}`)
        const dirString = curDir.join('/').replace('//', '/')
        directories.get(dirString).push(Number(line.split(' ')[0]))
    }
}

console.log(Array.from(directories.entries()))

const getAllFilesInSubDirectories = (parentKey) => {
    return Array.from(directories.entries())
        .filter(([key, value]) => key.startsWith(parentKey))
        .map(([key, value]) => value.reduce((sum, value) => sum + value, 0))
        .reduce((sum, value) => sum+value)
}
//console.log(getAllFilesInSubDirectories('/'))

const arrayWithEachDirectoryAndSumOfAllContainedFilesizes =
    Array.from(directories.entries())
    .map(([key, value]) => {
        let subDirSum = 0
        subDirSum += getAllFilesInSubDirectories(key)
        return [key, subDirSum];
    }
)
//console.log(arrayWithEachDirectoryAndSumOfAllContainedFilesizes)

const result =
    arrayWithEachDirectoryAndSumOfAllContainedFilesizes
        .map(([key, value]) => value)
        //.sort((a, b) => b-a)
        .filter(dirSize => dirSize<=100000)
        .reduce((sum, value)=>sum+value)

console.log(result)
//01_084_134

const usedSpace = getAllFilesInSubDirectories('/')//.reduce((sum, [key, value]) => sum+value)
console.log('space used: ', usedSpace)
const needFree = 30_000_000 - (70_000_000 - usedSpace)
console.log(needFree)
const result2 =
    arrayWithEachDirectoryAndSumOfAllContainedFilesizes
        //.map(([key, value]) => value)
        .filter(([key, dirSize]) => dirSize>=needFree)
        .sort(([x, a], [y, b]) => b-a)
        .reverse()

console.log(result2[0])
// [ '/nns/ncvv/nnch',              06_183_184 ]