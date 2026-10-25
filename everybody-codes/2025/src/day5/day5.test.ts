import "@puzzles/utils";
import { describe, expect, test } from "vitest";
import { readTestData } from "@puzzles/utils";
import { constructSpine, exampleFunction, type Spine } from "./day5";

describe(`day 5`, () => {
  test("sample", () => {
    expect(exampleFunction("1")).toBe(1);

    expect(constructSpine("58:5,3,7,8,9,10,4,5,7,8,8").spineScore).toBe(581078);

    var swords = [
      "1:2,4,1,1,8,2,7,9,8,6",
      "2:7,9,9,3,8,3,8,8,6,8",
      "3:4,7,6,9,1,8,3,7,2,2",
      "4:6,4,2,1,7,4,5,5,5,8",
      "5:2,9,3,8,3,9,5,2,1,4",
      "6:2,4,9,6,7,4,1,7,6,8",
      "7:2,3,7,6,2,2,4,1,4,2",
      "8:5,1,5,6,8,3,1,8,3,9",
      "9:5,7,7,3,7,2,3,8,6,7",
      "10:4,1,9,3,8,5,4,3,5,5",
    ];

    var strengths = swords.map((it) => constructSpine(it));
    var min = strengths.min();
    var max = strengths.max();
    console.log("diff", max! - min!);
  });

  test("part - 1", () => {
    var values = "90:7,9,3,3,9,5,1,8,4,6,8,4,3,6,7,3,5,3,6,1,2,3,9,5,6,1,4,4,2,7";

    expect(constructSpine(values).spineScore).toBe(7356375254);
  });

  test("part - 2", () => {
    const swords = readTestData(`./src/day5/notes2.txt`);
    var strengths = swords.map((it) => constructSpine(it).spineScore);
    var min = strengths.min();
    var max = strengths.max();
    console.log("diff", max! - min!);
  });

  test("part - 3 - sample", () => {
    const swords = [
      "1:7,1,9,1,6,9,8,3,7,2",
      "2:6,1,9,2,9,8,8,4,3,1",
      "3:7,1,9,1,6,9,8,3,8,3",
      "4:6,1,9,2,8,8,8,4,3,1",
      "5:7,1,9,1,6,9,8,3,7,3",
      "6:6,1,9,2,8,8,8,4,3,5",
      "7:3,7,2,2,7,4,4,6,3,1",
      "8:3,7,2,2,7,4,4,6,3,7",
      "9:3,7,2,2,7,4,1,6,3,7",
    ];
    var spines = swords.map((it) => constructSpine(it));
    spines.sort((a: Spine, b: Spine) => {
      if (a.spineScore === b.spineScore) {
        return 0;
      }
      return b.spineScore - a.spineScore;
    });
    console.log(spines.map((it) => it.index));

    var checkSum = 0;
    for (var i = 0; i < spines.length; i++) {
      checkSum += spines[i].index * (i + 1);
    }
    console.log("total", checkSum);
  });

  test("part - 3", () => {
    const swords = readTestData(`./src/day5/notes3.txt`);
    var spines = swords.map((it) => constructSpine(it));
    spines.sort((a: Spine, b: Spine) => {
      if (a.spineScore !== b.spineScore) {
        return b.spineScore - a.spineScore;
      }

      for (let i = 0; i < a.levelScores.length; i++) {
        if (a.levelScores[i] !== b.levelScores[i]) {
          return b.levelScores[i] - a.levelScores[i];
        }
      }

      return b.index - a.index;
    });

    var checkSum = 0;
    for (var i = 0; i < spines.length; i++) {
      checkSum += spines[i].index * (i + 1);
    }
    expect(checkSum).toBe(31121833);
  });
});
