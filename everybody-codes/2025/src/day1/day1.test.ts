import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import { findCircleName, findName, swapCircleName } from "./day1";

describe(`day 1`, () => {
	test("part1", () => {
		const names =
			"Sarnryn,Rynmirix,Loreldrin,Sorrax,Kynulth,Kroncyth,Yndulrix,Tirthel,Cynddar,Tyrgarath";
		const directions = "L3,R8,L7,R9,L1,R2,L2,R4,L6,R7,L6";

		expect(findName(names, directions)).toBe("Sorrax");
	});

	test("part2 - sample", () => {
		const names = "Vyrdax,Drakzyph,Fyrryn,Elarzris";
		const directions = "R3,L2,R3,L1";

		expect(findCircleName(names, directions)).toBe("Elarzris");
	});

	test("part2", () => {
		const data = readTestData(`./src/day1/notes2.txt`);
		expect(findCircleName(data[0], data[1])).toBe("Rahris");
	});

	test("part3 - sample", () => {
		const names = "Vyrdax,Drakzyph,Fyrryn,Elarzris";
		const directions = "R3,L2,R3,L3";

		expect(swapCircleName(names, directions)).toBe("Drakzyph");
	});

	test("part3", () => {
		const data = readTestData(`./src/day1/notes3.txt`);
		expect(swapCircleName(data[0], data[1])).toBe("Ralrex");
	});
});
