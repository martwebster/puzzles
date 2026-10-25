import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import { exampleFunction } from "./day3";

const dayNumber = "3";
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
