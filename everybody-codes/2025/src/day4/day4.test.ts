import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import { calculatePart3 } from "./day4";

describe(`day 4`, () => {
  test("part - 1", () => {
    const numbers = readTestData(`./src/day4/notes1.txt`).toNumbers();

    // ratio represent the number of turns of the last, to turn the first
    var ratio = numbers.first()! / numbers.last()!;
    expect(Math.trunc(ratio * 2025)).toBe(13682);
  });

  test("part - 2", () => {
    const numbers = readTestData(`./src/day4/notes2.txt`).toNumbers();
    var ratio = numbers.first()! / numbers.last()!;
    var turns = 10000000000000 / ratio;
    expect(Math.ceil(turns)).toBe(3123689727464);
  });

  test("part - 3", () => {
    const data = readTestData(`./src/day4/notes3.txt`);
    expect(calculatePart3(data)).toBe(468389647058);
  });
});
