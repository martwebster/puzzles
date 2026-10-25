import "@puzzles/utils";
import { test, describe, expect } from 'vitest'
import { readTestData } from '@puzzles/utils';
import {countBits, fabricate, replaceMolecules} from './day19';

const dayNumber = "19"

describe(`day ${dayNumber}`, () => {
    test('sample', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        const items = data.split("")
        const replacements = items[0]
        const start = items[1].first()!

        expect(replaceMolecules(replacements, start)).toStrictEqual([ 'HOOH', 'OHOH', 'HHHH', 'HOHO']);
        expect(replaceMolecules(replacements, "HOHOHO")).toStrictEqual([
            "HOOHOHO",
            "OHOHOHO",
            "HHHHOHO",
            "HOHOOHO",
            "HOHHHHO",
            "HOHOHOO",
            "HOHOHHH",]);

        expect(replaceMolecules(["H => OO"], "H2O")).toStrictEqual(["OO2O"])
        expect(replaceMolecules(["H2 => OO"], "H2O")).toStrictEqual(["OOO"])
    })

    test('part 1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        const items = data.split("")
        const replacements = items[0]
        const start = items[1].first()!

        expect(replaceMolecules(replacements, start).length).toBe(509)
    })

    test('sample - part 2', () => {
        const data = readTestData(`./src/day${dayNumber}/sample2.txt`);
        const items = data.split("")
        const replacements = items[0]

        expect(fabricate(replacements, "HOH")).toBe(3)
        expect(fabricate(replacements, "HOHOHO")).toBe(6)
    })

    test('part 2', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        const items = data.split("")
        const target = items[1].first()!

        // Breadth first search didn't work, so had to resort to looking at the input

        expect(countBits(target)).toBe(195)
    })
})