import * as fs from 'fs';
import {xor, readGrid} from "../helper/utils";
import {Graph} from "../helper/Graph";
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

class HeatMapPosition {
    x: number
    y: number
    height: number
    letter: string

    constructor(x: number, y: number, height: number, letter: string) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.letter = letter;
    }
}
const rawGrid = readGrid(fileContent)
const letterToHeight = (letter: string): number => letter === 'S' ? letterToHeight('a') : letter === 'E' ? letterToHeight('z') :letter.charCodeAt(0)-97+1
const heightGrid = rawGrid.map((gridRow, y) => gridRow.map((gridElement, x) => new HeatMapPosition(x, y, letterToHeight(gridElement), gridElement)))
const heightGraph = new Graph()
const gridElementToGraphNodeString = (gridElement: HeatMapPosition) => `{x: ${gridElement.x}, y: ${gridElement.y}, height: ${gridElement.height}}`
heightGrid.forEach(gridRow => gridRow.forEach(gridElement => heightGraph.addVertex(gridElementToGraphNodeString(gridElement))))
const isAdjacent = (coord1: HeatMapPosition, coord2: HeatMapPosition) => Math.abs(coord1.x - coord2.x) <= 1 && Math.abs(coord1.y - coord2.y) <= 1 && !(coord1.x !== coord2.x && coord1.y !== coord2.y)
const isAnEdgeFromAtoB = (a?: HeatMapPosition, b?: HeatMapPosition) => {
    if(!b || !a) return false;
    if(!isAdjacent(a, b)) return false;
    if(a === b) return false;
    if((b.height-a.height)>1) return false;
    return true;
}
function getElement(arr, x, y) { return arr[y] && arr[y][x] ? arr[y][x] : undefined; }
heightGrid.forEach(
    gridRow => gridRow.forEach(
        gridElement => {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                    const adjacentPosition = getElement(heightGrid, gridElement.x+dx, gridElement.y+dy);
                    if(isAnEdgeFromAtoB(gridElement, adjacentPosition)) {
                        heightGraph.addEdge(
                            gridElementToGraphNodeString(gridElement),
                            gridElementToGraphNodeString(adjacentPosition),
                            true
                        )
                    }
                }
            }
        }
    )
)
//console.log(heightGraph)
const startNodeStringRepresentation = gridElementToGraphNodeString(heightGrid.map(row => row.find(element => element.letter === 'S')).filter(element => element)[0])
const endNodeStringRepresentation = gridElementToGraphNodeString(heightGrid.map(row => row.find(element => element.letter === 'E')).filter(element => element)[0])
const allNonCyclicPaths = heightGraph.nonCyclicPaths(startNodeStringRepresentation, endNodeStringRepresentation).sort((a,b) => b.length - a.length)
const dijkstra = heightGraph.dijkstra(startNodeStringRepresentation, endNodeStringRepresentation)
console.log(dijkstra)
const allANodes = (heightGrid.map(row => row.filter(element => element.letter === 'a')).map(aNodeRow => aNodeRow.map(aNode => gridElementToGraphNodeString(aNode))).flat())
const part2 = allANodes.map((aNodeString, index) => {
    console.log(index);
    return heightGraph.dijkstra(aNodeString, endNodeStringRepresentation)
})
const x = part2.filter(path => path).map(path => path.length).sort((a,b) => b-a).reverse()
console.log(x.filter(element => element > 0)[0])