import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import { countSheep, exampleFunction, movingSheep } from "./day10";

describe(`day 10`, () => {
	test("sample", () => {
		const data = readTestData(`./src/day10/sample.txt`);

		expect(countSheep(data, 3)).toBe(27);
	});

	test("part - 1", () => {
		const data = readTestData(`./src/day10/notes1.txt`);

		expect(countSheep(data, 4)).toBe(140);
	});

	test("part - 2 - Sample", () => {
		const data = readTestData(`./src/day10/sample2.txt`);

		expect(movingSheep(data, 3)).toBe(27);
	});

	test("part - 2", () => {
		const data = readTestData(`./src/day10/notes2.txt`);

		expect(movingSheep(data, 20)).toBe(1754);
	});

	test("part - 3", () => {
		const data = readTestData(`./src/day10/notes3.txt`);
		const sum = data.map((line) => exampleFunction(line)).sum();
		expect(sum).toBe(6);
	});
});
