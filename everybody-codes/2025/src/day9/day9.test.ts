import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import { findChild, findParents2, findParents3, findScores } from "./day9";

describe(`day 9`, () => {
	test("sample", () => {
		var data = [
			"1:CAAGCGCTAAGTTCGCTGGATGTGTGCCCGCG",
			"2:CTTGAATTGGGCCGTTTACCTGGTTTAACCAT",
			"3:CTAGCGCTGAGCTGGCTGCCTGGTTGACCGCG",
		];
		expect(findChild(data)).toBe(2);
		expect(findScores(data)[2]).toBe(414);
	});

	test("part - 1", () => {
		const data = readTestData(`./src/day9/notes1.txt`);
		expect(findChild(data)).toBe(2);
		expect(findScores(data)[2]).toBe(6786);
	});

	test("part - 2", () => {
		const sampleData = readTestData(`./src/day9/part2sample.txt`);

		expect(findParents2(sampleData)).toBe(1245);
		const data = readTestData(`./src/day9/notes2.txt`);
		expect(findParents2(data)).toBe(319738);
	});

	test("part - 3 - Sample 1", () => {
		const data = readTestData(`./src/day9/part2sample.txt`);
		expect(findParents3(data)).toBe(12);
	});

	test("part - 3 - Sample 2", () => {
		const data = readTestData(`./src/day9/part3sample.txt`);
		expect(findParents3(data)).toBe(36);
	});

	test("part - 3", () => {
		const data = readTestData(`./src/day9/notes3.txt`);
		expect(findParents3(data)).toBe(45433);
	});
});
