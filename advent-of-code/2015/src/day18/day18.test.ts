import "@puzzles/utils";
import { test, describe, expect } from 'vitest'
import { readTestData } from '@puzzles/utils';
import {buildGrid, countLights, displayGrid, isOnAtPos, isCorner, step} from './day18';
import {repeat} from "@puzzles/utils";

const dayNumber = "18"
describe(`day ${dayNumber}`, () => {
    test('sample', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        let grid = buildGrid(data)

        expect(isOnAtPos(grid, {x: 0, y:0})).toBe(false);
        expect(isOnAtPos(grid, {x: 0, y:1})).toBe(false);
        expect(isOnAtPos(grid, {x: 0, y:2})).toBe(true);

        displayGrid(grid);
        grid = step(grid)
        displayGrid(grid);
        grid = step(grid)
        displayGrid(grid);
        grid = step(grid)
        displayGrid(grid);
        grid = step(grid)
        displayGrid(grid);

        expect (countLights(grid)).toBe(4)
    })

    test('part1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        let grid = buildGrid(data)
        repeat(100, ()=>{
            grid = step(grid)
        })
        displayGrid(grid);
        expect (countLights(grid)).toBe(1061)
    })


    test('sample part 2', () => {
        const data = readTestData(`./src/day${dayNumber}/sample2.txt`);
        let grid = buildGrid(data)

        expect(isCorner(grid, {x:0, y:0})).toBe(true);
        expect(isCorner(grid, {x:0, y:5})).toBe(true);
        expect(isCorner(grid, {x:5, y:0})).toBe(true);
        expect(isCorner(grid, {x:5, y:5})).toBe(true);

        displayGrid(grid);
        grid = step(grid, true)
        displayGrid(grid);

        grid = step(grid, true)
        displayGrid(grid);
        grid = step(grid, true)
        displayGrid(grid);
        grid = step(grid, true)
        displayGrid(grid);
        grid = step(grid, true)
        displayGrid(grid);
        expect (countLights(grid)).toBe(17)
    })

    test('part2', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        let grid = buildGrid(data)
        repeat(100, ()=>{
            grid = step(grid, true)
        })
        displayGrid(grid);
        expect (countLights(grid)).toBe(1006)
    })
})