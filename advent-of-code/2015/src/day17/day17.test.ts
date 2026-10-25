import "@puzzles/utils";
import { test, describe, expect } from 'vitest'
import { readTestData } from '@puzzles/utils';
import {getMinContainers, getWays} from './day17';

const dayNumber = "17"
describe(`day ${dayNumber}`, () => {

    test('sample', () => {
        const containers = [20,15,10,5,5];

        expect (getWays(containers, 25).length).toBe(4);
    })

    test('part1', () => {
        const containers = readTestData(`./src/day${dayNumber}/input.txt`).toNumbers();

        expect (getWays(containers, 150).length).toBe(1304);
    })

    test('part2', () => {
        const containers = readTestData(`./src/day${dayNumber}/input.txt`).toNumbers();

        expect (getMinContainers(containers, 150)).toBe(18);
    })

})