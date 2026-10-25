import "@puzzles/utils";
import { test, describe, expect } from 'vitest'
import { readTestData } from '@puzzles/utils';
import {findExactSue, findRangesSue, Sue} from './day16';

const dayNumber = "16"
describe(`day ${dayNumber}`, () => {

    test('part1', () => {
        const machineData = readTestData(`./src/day${dayNumber}/machine.txt`);
        const machine = new Map<string, number>();
        machineData.forEach((item) => {
            machine.set(item.substringBefore(":")!, Number(item.substringAfter(":")))
        });
        expect(machine.get("children")).toBe(3)

        const suesData = readTestData(`./src/day${dayNumber}/input.txt`);
        const sues = Sue.of(suesData);
        expect (sues[0].props.get("cars")).toBe(9)
        expect (sues[0].id).toBe(1);

        expect (findExactSue(sues, machine)).toBe(373);
    })

    test('part2', () => {
        const machineData = readTestData(`./src/day${dayNumber}/machine.txt`);
        const equal = new Map<string, number>();
        machineData.forEach((item) => {
            equal.set(item.substringBefore(":")!, Number(item.substringAfter(":")))
        });
        expect(equal.get("children")).toBe(3)

        const greaterThan = new Map<string, number>();
        greaterThan.set("cats", equal.get("cats")!);
        equal.delete("cats")
        greaterThan.set("trees", equal.get("trees")!);
        equal.delete("trees")

        const lessThan = new Map<string, number>();
        lessThan.set("pomeranians", equal.get("pomeranians")!);
        equal.delete("pomeranians")
        lessThan.set("goldfish", equal.get("goldfish")!);
        equal.delete("goldfish")

        const suesData = readTestData(`./src/day${dayNumber}/input.txt`);
        const sues = Sue.of(suesData);

        expect (findRangesSue(sues, lessThan, equal, greaterThan)).toBe(260);

    })
})