export type ThrowInstruction = {targetMonkeyId: number, item: number};
export class Monkey {
    private items: number[];
    private readonly operation: (input: {old: number}) => number;
    private readonly testVariables: {divisor: number, trueCaseDestinationId: number, falseCaseDestinationId: number};
    private inspections: number = 0;
    reduceWorryLevel?: (oldWorry: number) => number;

    constructor(startingItems: number[], operation: (input: {old: number}) => number, test: {divisor: number, trueCaseDestinationId: number, falseCaseDestinationId: number}) {
        this.items = startingItems;
        this.operation = operation;
        this.testVariables = test;
    }

    private test = (worryLevel: number): ThrowInstruction => {
        return {
            targetMonkeyId: worryLevel % this.testVariables.divisor === 0
                ? this.testVariables.trueCaseDestinationId
                : this.testVariables.falseCaseDestinationId,
                item: worryLevel
        }
    }

    private inspect = () => {
        this.inspections += this.items.length;
        this.items = this.items
            .map(oldWorryLevel => this.operation({old: oldWorryLevel}))
            .map(newWorryLevel => this.reduceWorryLevel
                ? this.reduceWorryLevel(newWorryLevel)
                : Math.floor(newWorryLevel/3)
            );
        //this.items = this.items.map(oldWorryLevel => this.operation({old: oldWorryLevel})).map(newWorryLevel => Math.floor(newWorryLevel/3));
    }

    public turn = (): ThrowInstruction[] => {
        this.inspect();
        const throwInstructions = this.items.map(this.test)
        this.items = [];
        return throwInstructions
    }

    public add = (value: number) => {
        this.items.push(value);
    }

    public getInspections = () => {
        return this.inspections
    }

    public getDivisor = () => {
        return this.testVariables.divisor
    }
}

export const readMonkeyInput = (monkeyInputString: string) => {
    const lines = monkeyInputString.split(/\r?\n/)
    const monkeyId = Number(lines[0].match(/\d+/))
    const startingItems = lines[1].match(/\d+/g).map(group => Number(group))
    const operationString = lines[2].replace('Operation: new = ', '')
    const divisor = Number(lines[3].match(/\d+/))
    const trueDestinationId = Number(lines[4].match(/\d+/))
    const falseDestinationId = Number(lines[5].match(/\d+/))
    //Example
    //const func = calculationParser('(4 * (2 + y) / 5)');
    //const result = func({y: 3});
    //console.log(result); // 10
    return {monkeyId: monkeyId, startingItems: startingItems, operation: calculationParser(operationString), test: {divisor: divisor, trueCaseDestinationId: trueDestinationId, falseCaseDestinationId: falseDestinationId}}
}

//Regex
const regex = /[-+*/()]|(\w+)/g;

//Function
const calculationParser = (str) => {
    const tokens = str.match(regex);
    return (variables) => {
        let expression = tokens.map(token => {
            if (token in variables) {
                return variables[token];
            } else {
                return token;
            }
        })
        return Function('"use strict";return (' + expression.join('') + ')')();
    }
}