import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import { buildRules, countNames, countNewNames, findName, passName } from "./day7";

const dayNumber = "7";
describe(`day ${dayNumber}`, () => {
  test("sample", () => {
    const data = readTestData(`./src/day${dayNumber}/sample.txt`);
    var rules = data.splice(2);
    const rulesMap = buildRules(rules);
    expect(rulesMap.size).toBe(10);

    expect(passName("Oroneth", rulesMap)).toBe(true);
    expect(passName("Oronris", rulesMap)).toBe(false);
    expect(passName("Urakris", rulesMap)).toBe(false);
    expect(passName("Uraketh", rulesMap)).toBe(false);
    expect(findName(data[0], rulesMap)).toBe("Oroneth");
  });

  test("part - 1", () => {
    const data = readTestData(`./src/day${dayNumber}/notes1.txt`);
    var rules = data.splice(2);
    const rulesMap = buildRules(rules);
    expect(rulesMap.size).toBe(16);
    expect(findName(data[0], rulesMap)).toBe("Kynarith");
  });

  test("part - 2", () => {
    const data = readTestData(`./src/day${dayNumber}/notes2.txt`);
    var rules = data.splice(2);
    const rulesMap = buildRules(rules);
    expect(rulesMap.size).toBe(25);
    expect(countNames(data[0], rulesMap)).toBe(3073);
  });

  test("part - 3 - sample", () => {
    const data = readTestData(`./src/day${dayNumber}/sample2.txt`);
    var rules = data.splice(2);
    const rulesMap = buildRules(rules);
    expect(countNewNames(data[0], rulesMap)).toBe(25);
  });

  test("part - 3 - sample 2", () => {
    const data = readTestData(`./src/day${dayNumber}/sample3.txt`);
    var rules = data.splice(2);
    const rulesMap = buildRules(rules);
    expect(countNewNames(data[0], rulesMap)).toBe(1154);
  });

  test("part - 3", () => {
    const data = readTestData(`./src/day${dayNumber}/notes3.txt`);
    var rules = data.splice(2);
    const rulesMap = buildRules(rules);
    expect(countNewNames(data[0], rulesMap)).toBe(5027820);
  });
});
