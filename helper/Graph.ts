import {getOneInstanceOfEachDuplicatedElement} from "./utils";

export type AdjacencyList = { [key: string]: string[] }
export class Graph {
    adjList: AdjacencyList;

    constructor() {
        this.adjList = {};
    }

    addVertex(vertex: string) {
        if (!this.adjList[vertex]) this.adjList[vertex] = [];
    }

    addEdge(vertex1: string, vertex2: string, unidirectional?: boolean) {
        this.adjList[vertex1].push(vertex2);
        if(!unidirectional){
            this.adjList[vertex2].push(vertex1);
        }
    }

    removeEdge(vertex1: string, vertex2: string) {
        this.adjList[vertex1] = this.adjList[vertex1].filter(
            (v) => v !== vertex2
        );
        this.adjList[vertex2] = this.adjList[vertex2].filter(
            (v) => v !== vertex1
        );
    }

    removeVertex(vertex: string) {
        while (this.adjList[vertex].length) {
            const adjacentVertex = this.adjList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjList[vertex];
    }

    depthFirstSearch(start: string) {
        const result = [];
        const visited = {};
        const adjacencyList = this.adjList;

        (function dfs(vertex) {
            if (!vertex) return null;
            visited[vertex] = true;
            result.push(vertex);
            adjacencyList[vertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    return dfs(neighbor);
                }
            });
        })(start);

        return result;
    }

    breadthFirstSearch(start: string) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;

        visited[start] = true;
        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);

            this.adjList[currentVertex].forEach((neighbor) => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            });
        }
        return result;
    }

    nonCyclicPaths(start: string, end: string): string[][] {
        let paths = [];
        let visited = new Set();
        let queue = [[start]];

        while (queue.length > 0) {
            let path = queue.shift();
            let node = path[path.length - 1];

            if (node === end) {
                paths.push(path);
            }

            if (visited.has(node)) {
                continue;
            }

            visited.add(node);
            for (let neighbor of this.adjList[node]) {
                let newPath = [...path, neighbor];
                queue.push(newPath);
            }
        }
        return paths;
    }

    // Dijkstra's Algorithm Implementation
    dijkstra(source: string, target: string, equalWeights: boolean = false): string[] {
        // Initialize the shortest path array
        const shortestPath: string[] = [];
        // Initialize the distances array
        const distances: { [key: string]: number } = {};
        // Initialize the previous nodes array
        const previous: { [key: string]: string } = {};
        // Initialize the unvisited nodes array
        const unvisited: string[] = [];

        // Set the distances of each node to infinity
        for (const node in this.adjList) {
            distances[node] = Infinity;
            unvisited.push(node);
        }

        // Set the distance of the source node to 0
        distances[source] = 0;
        let currentNode = source;

        // Loop until all nodes have been visited
        while (unvisited.length) {
            // Break if the target node has been reached
            if (currentNode === target) break;

            // Loop over the neighbors of the current node
            for (const neighbor of this.adjList[currentNode]) {
                // Calculate the distance to the neighbor
                let distance = distances[currentNode] + 1;
                // Update the distance if it is smaller than the current distance
                if (distance < distances[neighbor]) {
                    distances[neighbor] = distance;
                    previous[neighbor] = currentNode;
                }
            }
            // Remove the current node from the unvisited nodes
            unvisited.splice(unvisited.indexOf(currentNode), 1);
            // Get the node with the smallest distance that is not the current node
            let nextNode = unvisited
                .filter(node => node !== currentNode)
                .sort((a, b) => distances[a] - distances[b])[0];
            // If the next node is not found, break out of the loop
            if (!nextNode) break;
            currentNode = nextNode;
        }

        // Build the shortest path
        currentNode = target;
        while (currentNode !== source) {
            shortestPath.unshift(currentNode);
            currentNode = previous[currentNode];
            if(currentNode === undefined) return []
        }
        shortestPath.unshift(source);

        return shortestPath;
    }
}