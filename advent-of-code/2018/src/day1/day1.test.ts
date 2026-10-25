import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import { calculator, part2 } from "./day1";

const dayNumber = "1";
describe(`day ${dayNumber}`, () => {
  test("part1", () => {
    const data = readTestData(`./src/day${dayNumber}/input.txt`);
    expect(calculator(data)).toBe(430);
  });

  test("part2", () => {
    const data = readTestData(`./src/day${dayNumber}/input.txt`);
    expect(part2(data)).toBe(462);
  });
});
