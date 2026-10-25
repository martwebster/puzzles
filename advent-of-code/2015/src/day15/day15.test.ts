import "@puzzles/utils";
import { test, describe, expect } from "vitest";
import { readTestData } from "@puzzles/utils";
import { generateArrays, getMaxScore, getTotal, getTotalScore, Ingredient } from "./day15";

const dayNumber = "15";
describe(`day ${dayNumber}`, () => {
  test("sample - ingredient", () => {
    const data = readTestData(`./src/day${dayNumber}/input.txt`);

    const ingredients = Ingredient.of(data);
    expect(ingredients[0].name).toBe("Sprinkles");
    expect(ingredients[0].capacity).toBe(5);
    expect(ingredients[0].durability).toBe(-1);
    expect(ingredients[0].flavor).toBe(0);
    expect(ingredients[0].texture).toBe(0);
    expect(ingredients[0].calories).toBe(5);
  });

  test("sample", () => {
    const data = readTestData(`./src/day${dayNumber}/sample.txt`);
    let ingredients = Ingredient.of(data);
    expect(ingredients.length).toBe(2);
    const total = getTotal(ingredients, [44, 56]);
    expect(total.capacity).toBe(68);
    expect(total.durability).toBe(80);
    expect(total.flavor).toBe(152);
    expect(total.texture).toBe(76);
    expect(getTotalScore(total)).toBe(62842880);
  });

  test("part1", () => {
    const data = readTestData(`./src/day${dayNumber}/input.txt`);
    let ingredients = Ingredient.of(data);
    expect(ingredients.length).toBe(4);
    expect(getMaxScore(ingredients)).toBe(13882464);
  });

  test("part2", () => {
    const data = readTestData(`./src/day${dayNumber}/input.txt`);
    let ingredients = Ingredient.of(data);
    expect(ingredients.length).toBe(4);
    expect(getMaxScore(ingredients, 500)).toBe(11171160);
  });

  test("generateArrays", () => {
    const count = generateArrays(1, 100);
    expect(count).toStrictEqual([[100]]);

    const count2 = generateArrays(2, 100);
    expect(count2.length).toBe(101);

    const count4 = generateArrays(4, 100);
    expect(count4.length).toBe(176851);
  });
});
