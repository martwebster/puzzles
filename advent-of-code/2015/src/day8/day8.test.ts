import "@puzzles/utils";
import { test, describe, expect } from 'vitest'
import { readTestData } from '@puzzles/utils';
import {
    decode,
    encode,
    getCharacterLengths,
    getDecodedLengths,
    getEncodedLengths, getEncodingTotal,
    getTotal
} from './day8';

const dayNumber = "8"
describe(`day ${dayNumber}`, () => {
    test('sample', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);
        expect(getCharacterLengths(data)).toStrictEqual([2,5,10,6])
        // ""
        expect(decode(data[0])).toBe("");

        // "abc"
        expect(decode(data[1])).toBe("abc");

        // "aaa\"aaa"
        expect(decode(data[2])).toBe('aaa"aaa');
        // "\x27"
        expect(decode(data[3])).toBe('_');

        expect(getDecodedLengths(data)).toStrictEqual([0,3,7,1])

        expect(getTotal(data)).toBe(12)

    })

    test('part1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        expect(getTotal(data)).toBe(1371)
    })

    test('sample part 2', () => {
        const data = readTestData(`./src/day${dayNumber}/sample.txt`);

        // ""
        expect(encode(data[0])).toBe('"\\"\\""');

        // "abc"
        expect(encode(data[1])).toBe('"\\"abc\\""');

        // "aaa\"aaa"
        expect(encode(data[2])).toBe('"\\"aaa\\\\\\"aaa\\""');

        // "\x27"
        expect(encode(data[3])).toBe('"\\"\\\\x27\\""');
        expect(getEncodedLengths(data)).toStrictEqual([6,9,16,11])
        expect(getEncodingTotal(data)).toBe(19)
    })

    test('part1', () => {
        const data = readTestData(`./src/day${dayNumber}/input.txt`);
        expect(getEncodingTotal(data)).toBe(2117)
    })
})