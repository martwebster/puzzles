import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import { calcSameLetter, count, getSameLetter, isPresent } from "./day2";

const dayNumber = "2";
describe(`day ${dayNumber}`, () => {
	test("sample", () => {
		expect(isPresent("abcdef", 2)).toBe(false);
		expect(isPresent("abcdef", 3)).toBe(false);

		expect(isPresent("bababc", 2)).toBe(true);
		expect(isPresent("bababc", 3)).toBe(true);

		var lines = [
			"bababc",
			"abcdef",
			"abbcde",
			"abcccd",
			"aabcdd",
			"abcdee",
			"ababab",
		];
		expect(count(lines, 2)).toBe(4);
		expect(count(lines, 3)).toBe(3);
	});

	test("part1", () => {
		const data = readTestData(`./src/day${dayNumber}/input.txt`);
		expect(count(data, 2)).toBe(248);
		expect(count(data, 3)).toBe(23);
	});

	test("sample - part 2", () => {
		expect(calcSameLetter("abcde", "axcye")).toBe("ace");
		expect(calcSameLetter("fghij", "fguij")).toBe("fgij");

		var lines = ["abcde", "fghij", "klmno", "pqrst", "fguij", "axcye", "wvxyz"];
		expect(getSameLetter(lines)).toBe("fgij");
	});

	test("part2", () => {
		const data = readTestData(`./src/day${dayNumber}/input.txt`);
		expect(getSameLetter(data)).toBe("umdryabviapkozistwcnihjqx");
	});
});
