import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import {
	calculateSearchBlock,
	countPairs,
	countPairsinTents,
	countSwordfightingPairs,
} from "./day6";

describe(`day 6`, () => {
	test("sample", () => {
		expect(countSwordfightingPairs("ABabACacBCbca")).toBe(5);
	});

	test("part - 1", () => {
		const data = readTestData(`./src/day6/notes1.txt`)[0];
		expect(countSwordfightingPairs(data)).toBe(181);
	});

	test("part - 2", () => {
		expect(countPairs("ABabACacBCbca")).toBe(11);
		const data = readTestData(`./src/day6/notes2.txt`);
		expect(countPairs(data[0])).toBe(4150);
	});

	test("part - 3", () => {
		const line = "0123456789";
		expect(calculateSearchBlock(line, 0, 2, false, false)).toStrictEqual("012");
		expect(calculateSearchBlock(line, 1, 2, false, false)).toStrictEqual("0123");
		expect(calculateSearchBlock(line, 2, 2, false, false)).toStrictEqual("01234");
		expect(calculateSearchBlock(line, 3, 2, false, false)).toStrictEqual("12345");
		expect(calculateSearchBlock(line, 7, 2, false, false)).toStrictEqual("56789");
		expect(calculateSearchBlock(line, 8, 2, false, false)).toStrictEqual("6789");
		expect(calculateSearchBlock(line, 9, 2, false, false)).toStrictEqual("789");

		expect(calculateSearchBlock(line, 0, 2, true, false)).toStrictEqual("89012");
		expect(calculateSearchBlock(line, 1, 2, true, false)).toStrictEqual("90123");
		expect(calculateSearchBlock(line, 2, 2, true, false)).toStrictEqual("01234");
		expect(calculateSearchBlock(line, 3, 2, true, false)).toStrictEqual("12345");
		expect(calculateSearchBlock(line, 7, 2, true, false)).toStrictEqual("56789");
		expect(calculateSearchBlock(line, 8, 2, true, false)).toStrictEqual("6789");
		expect(calculateSearchBlock(line, 9, 2, true, false)).toStrictEqual("789");

		expect(calculateSearchBlock(line, 0, 2, false, true)).toStrictEqual("012");
		expect(calculateSearchBlock(line, 1, 2, false, true)).toStrictEqual("0123");
		expect(calculateSearchBlock(line, 2, 2, false, true)).toStrictEqual("01234");
		expect(calculateSearchBlock(line, 3, 2, false, true)).toStrictEqual("12345");
		expect(calculateSearchBlock(line, 7, 2, false, true)).toStrictEqual("56789");
		expect(calculateSearchBlock(line, 8, 2, false, true)).toStrictEqual("67890");
		expect(calculateSearchBlock(line, 9, 2, false, true)).toStrictEqual("78901");

		expect(countPairsinTents("AABCBABCABCabcabcABCCBAACBCa", 10, 1)).toBe(34);
		expect(countPairsinTents("AABCBABCABCabcabcABCCBAACBCa", 10, 2)).toBe(72);

		const data = readTestData(`./src/day6/notes3.txt`);
		expect(countPairsinTents(data[0], 1000, 1000)).toBe(1668233309);
	});
});
