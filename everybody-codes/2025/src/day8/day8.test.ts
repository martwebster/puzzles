import "@puzzles/utils";
import { test, describe, expect } from "vitest";
import { readTestData } from "@puzzles/utils";
import { countCenters } from "./day8";

describe(`day 8`, () => {
  test("sample", () => {
    expect(countCenters("1,5,2,6,8,4,1,7,3", 8)).toBe(4);
  });

  test("part - 1", () => {
    const data = readTestData(`./src/day8/notes1.txt`)[0];
    expect(countCenters(data, 32)).toBe(59);
  });

  test("part - 2", () => {
    const data = readTestData(`./src/day8/notes2.txt`);
  });

  test("part - 3", () => {
    const data = readTestData(`./src/day8/notes3.txt`);
  });
});
