import "@puzzles/utils";
import { readTestData } from "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { exampleFunction } from "./dayx";

const dayNumber = "x";
describe(`day ${dayNumber}`, () => {
	test("sample", () => {
		expect(exampleFunction("1")).toBe(1);
	});

	test("part - 1", () => {
		const data = readTestData(`./src/day${dayNumber}/notes1.txt`);
		const sum = data.map((line) => exampleFunction(line)).sum();
		expect(sum).toBe(6);
	});

	test("part - 2", () => {
		const data = readTestData(`./src/day${dayNumber}/notes2.txt`);
		const sum = data.map((line) => exampleFunction(line)).sum();
		expect(sum).toBe(6);
	});

	test("part - 3", () => {
		const data = readTestData(`./src/day${dayNumber}/notes3.txt`);
		const sum = data.map((line) => exampleFunction(line)).sum();
		expect(sum).toBe(6);
	});
});
