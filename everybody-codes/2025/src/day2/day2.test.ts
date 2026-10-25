import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import {
  addition,
  calculateOpCorner,
  cycle,
  division,
  engrave,
  multiply,
  shouldBeEngraved,
} from "./day2";

describe(`day 2`, () => {
  test("sample", () => {
    expect(multiply({ x: 1, y: 1 }, { x: 2, y: 2 })).toStrictEqual({
      x: 0,
      y: 4,
    });
    expect(multiply({ x: 2, y: 5 }, { x: 3, y: 7 })).toStrictEqual({
      x: -29,
      y: 29,
    });
    expect(multiply({ x: -2, y: 5 }, { x: 10, y: -1 })).toStrictEqual({
      x: -15,
      y: 52,
    });
    expect(multiply({ x: -1, y: -2 }, { x: -3, y: -4 })).toStrictEqual({
      x: -5,
      y: 10,
    });

    expect(addition({ x: 1, y: 1 }, { x: 2, y: 2 })).toStrictEqual({
      x: 3,
      y: 3,
    });
    expect(addition({ x: 2, y: 5 }, { x: 3, y: 7 })).toStrictEqual({
      x: 5,
      y: 12,
    });

    expect(addition({ x: -2, y: 5 }, { x: 10, y: -1 })).toStrictEqual({
      x: 8,
      y: 4,
    });
    expect(addition({ x: -1, y: -2 }, { x: -3, y: -4 })).toStrictEqual({
      x: -4,
      y: -6,
    });

    expect(division({ x: 10, y: 12 }, { x: 2, y: 2 })).toStrictEqual({
      x: 5,
      y: 6,
    });
    expect(division({ x: 10, y: 12 }, { x: 3, y: 5 })).toStrictEqual({
      x: 3,
      y: 2,
    });
    expect(division({ x: -10, y: -12 }, { x: 2, y: 2 })).toStrictEqual({
      x: -5,
      y: -6,
    });
    expect(division({ x: -11, y: -12 }, { x: 3, y: 5 })).toStrictEqual({
      x: -3,
      y: -2,
    });

    expect(cycle({ x: 25, y: 9 })).toBe("[357,862]");
  });

  test("part - 1", () => {
    expect(cycle({ x: 149, y: 54 })).toBe("[154985,690864]");
  });

  test("part - 2", () => {
    expect(calculateOpCorner({ x: 35300, y: -64910 })).toStrictEqual({
      x: 36300,
      y: -63910,
    });
    expect(shouldBeEngraved({ x: 35630, y: -64880 })).toBe(true);
    expect(shouldBeEngraved({ x: 35460, y: -64910 })).toBe(false);

    var start = { x: -3314, y: 68783 };

    expect(calculateOpCorner(start)).toStrictEqual({ x: -2314, y: 69783 });

    expect(engrave(start)).toBe(565);
  });

  test("part - 3", () => {
    expect(engrave({ x: 35300, y: -64910 }, 1000)).toBe(406954);
    expect(engrave({ x: -3314, y: 68783 }, 1000)).toBe(53482);
  });
});
