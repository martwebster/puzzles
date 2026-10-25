import "@puzzles/utils";
import { test, describe, expect } from "vitest";

import { exampleFunction, getCheapestWin, getExpensiveLoss } from "./day21";

const dayNumber = "21";
describe(`day ${dayNumber}`, () => {
  test("part1", () => {
    const win = getCheapestWin({
      hitpoints: 109,
      damange: 8,
      armour: 2,
    });
    expect(win).toBe(111);
  });

  test("part2", () => {
    const loss = getExpensiveLoss({
      hitpoints: 109,
      damange: 8,
      armour: 2,
    });
    expect(loss).toBe(188);
  });
});
