import "@puzzles/utils";
import { test, describe, expect } from "vitest";
import { readTestData } from "@puzzles/utils";
import { exampleFunction } from "./day24";

const dayNumber = "24";
describe(`day ${dayNumber}`, () => {
	test("sample", () => {
		expect(exampleFunction("1")).toBe(1);
	});

	test("part1", () => {
		const data = readTestData(`./src/day${dayNumber}/input.txt`);
		const sum = data.map((line) => exampleFunction(line)).sum();
		expect(sum).toBe(6);
	});
});
