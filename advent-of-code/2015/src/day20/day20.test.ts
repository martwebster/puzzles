import "@puzzles/utils";
import { test, describe, expect } from 'vitest'
import { readTestData } from '@puzzles/utils';
import {findHouse, findHouseWithLimitedElves, getDivisors} from './day20';

const dayNumber = "20"
describe(`day ${dayNumber}`, () => {
    test('sample', () => {
        expect(getDivisors(6)).toStrictEqual([1,2,3,6]);
    })

    test('part1', () => {
        // takes 5 mins to run, got to be optimised
        expect(findHouse()).toStrictEqual(665280);
    })

    
    test('part2', () => {
        // 4989600 is too high
        // 3255840 is too high
        expect(findHouseWithLimitedElves(29000000)).toStrictEqual(705600);
    })
})