import * as fs from 'fs';
import {Monkey, readMonkeyInput} from "./Monkey";
import {getSmallestNumberGreaterZeroThatIsEquivalentToNInAllRestClasses} from "../helper/utils";
const fileName = './input.txt';
let fileContent = fs.readFileSync(fileName, 'utf8');

const monkeyDefinitions =  fileContent.split(/(\r?\n){2}/g).filter((group, index) => index%2 === 0)
const part_1 = () => {
    console.log('Part 1:')
    const monkeys: Monkey[] = monkeyDefinitions.map(monkeyDefinition => {
        const monkeyInformation = readMonkeyInput(monkeyDefinition);
        return new Monkey(
            monkeyInformation.startingItems,
            monkeyInformation.operation,
            monkeyInformation.test
        )
    })
    const rounds = 20
    for (let i = 0; i < rounds; i++) {
        //if(i < 10 || i < 1000 && i % 10 === 0 || i % 1000 === 0) console.log(i)
        for (let i = 0; i < monkeys.length; i++) {
            const throws = monkeys[i].turn();
            for (let j = 0; j < throws.length; j++) {
                monkeys[throws[j].targetMonkeyId].add(throws[j].item);
            }
        }
    }
    const solution = monkeys.map((monkey, index) => [monkey.getInspections(), index]).sort(([a, x], [b, y]) => b-a)
    console.log(solution)
    console.log(solution[0][0] * solution[1][0])
}

const part_2 = () => {
    console.log('Part 2:')
    const monkeys_2: Monkey[] = monkeyDefinitions.map(monkeyDefinition => {
        const monkeyInformation = readMonkeyInput(monkeyDefinition);
        return new Monkey(
            monkeyInformation.startingItems,
            monkeyInformation.operation,
            monkeyInformation.test
        )
    })
    const restClassesForPartTwo = monkeys_2.map(monkey => monkey.getDivisor())
    monkeys_2.forEach(
        monkey => monkey.reduceWorryLevel = (worryLevel: number) =>
            getSmallestNumberGreaterZeroThatIsEquivalentToNInAllRestClasses(worryLevel, restClassesForPartTwo))

    const rounds_2 = 10_000
    for (let i = 0; i < rounds_2; i++) {
        //if(i < 10 || i < 1000 && i % 10 === 0 || i % 1000 === 0) console.log(i)
        for (let i = 0; i < monkeys_2.length; i++) {
            const throws = monkeys_2[i].turn();
            for (let j = 0; j < throws.length; j++) {
                monkeys_2[throws[j].targetMonkeyId].add(throws[j].item);
            }
        }
    }
    const solution2 = monkeys_2.map((monkey, index) => [monkey.getInspections(), index]).sort(([a, x], [b, y]) => b-a)
    console.log(solution2)
    console.log(solution2[0][0] * solution2[1][0])
    // part 2: 11_614_682_178
}

part_1()
part_2()

