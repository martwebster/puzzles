import "@puzzles/utils";
import { test, describe, expect } from "vitest";
import { readTestData } from "@puzzles/utils";
import { State, triple, increment, jump, jumpIfEven, half, jumpIfOne, compute } from "./day23";

const dayNumber = "23";
describe(`day ${dayNumber}`, () => {
	test("sample", () => {
		const compSate: State = {
			lineNumber: 100,
			registers: new Map([
				["a", 100],
				["b", 10],
			]),
		};
		State.displayState(compSate);
	});

	test("sample 2", () => {
		const data = readTestData(`./src/day${dayNumber}/sample.txt`);

		var state = compute(data);
		expect(state.registers.get("a")).toBe(2);
	});

	test("part1", () => {
		const data = readTestData(`./src/day${dayNumber}/input.txt`);
		var state = compute(data);
		expect(state.registers.get("b")).toBe(184);
	});

	test("part2", () => {
		const data = readTestData(`./src/day${dayNumber}/input.txt`);

		const initialState: State = {
			lineNumber: 0,
			registers: new Map().set("a", 1),
		};
		var state = compute(data, initialState);
		expect(state.registers.get("b")).toBe(231);
	});
});

describe("Half", () => {
	test('should match lines starting with "hlf"', () => {
		expect(half.match("hlf a")).toBe(true);
		expect(half.match("inc a")).toBe(false);
	});

	test("should process the line and update the state correctly", () => {
		const initialState: State = {
			lineNumber: 0,
			registers: new Map([
				["a", 100],
				["b", 10],
			]),
		};

		const newState = half.process("hlf a", initialState);

		expect(newState.lineNumber).toBe(1);
		expect(newState.registers.get("a")).toBe(50);
		expect(newState.registers.get("b")).toBe(10);
	});
});

describe("Triple", () => {
	test('should match lines starting with "tpl"', () => {
		expect(triple.match("tpl a")).toBe(true);
		expect(triple.match("hlf a")).toBe(false);
	});

	test("should process the line and update the state correctly", () => {
		const initialState: State = {
			lineNumber: 0,
			registers: new Map([
				["a", 100],
				["b", 10],
			]),
		};

		const newState = triple.process("tpl a", initialState);

		expect(newState.lineNumber).toBe(1);
		expect(newState.registers.get("a")).toBe(300);
		expect(newState.registers.get("b")).toBe(10);
	});
});

describe("Increment", () => {
	test('should match lines starting with "inc"', () => {
		expect(increment.match("inc a")).toBe(true);
		expect(increment.match("tpl a")).toBe(false);
	});

	test("should process the line and update the state correctly", () => {
		const initialState: State = {
			lineNumber: 0,
			registers: new Map([
				["a", 100],
				["b", 10],
			]),
		};

		const newState = increment.process("inc a", initialState);

		expect(newState.lineNumber).toBe(1);
		expect(newState.registers.get("a")).toBe(101);
		expect(newState.registers.get("b")).toBe(10);
	});
});

describe("JmpFunction", () => {
	test('should match lines starting with "jmp"', () => {
		expect(jump.match("jmp 2")).toBe(true);
		expect(jump.match("inc a")).toBe(false);
	});

	test("should process the line and update the state correctly", () => {
		const initialState: State = {
			lineNumber: 0,
			registers: new Map([
				["a", 100],
				["b", 10],
			]),
		};

		const newState = jump.process("jmp +2", initialState);

		expect(newState.lineNumber).toBe(2);
		expect(newState.registers.get("a")).toBe(100);
		expect(newState.registers.get("b")).toBe(10);
	});

	test("should process the line and update the state correctly for negative jump", () => {
		const initialState: State = {
			lineNumber: 2,
			registers: new Map([
				["a", 100],
				["b", 10],
			]),
		};

		const newState = jump.process("jmp -2", initialState);

		expect(newState.lineNumber).toBe(0);
		expect(newState.registers.get("a")).toBe(100);
		expect(newState.registers.get("b")).toBe(10);
	});
});

describe("JumpIfEvenFunction", () => {
	test('should match lines starting with "jie"', () => {
		expect(jumpIfEven.match("jie a, +2")).toBe(true);
		expect(jumpIfEven.match("jmp +2")).toBe(false);
	});

	test("should process the line and jump if register is even", () => {
		const initialState: State = {
			lineNumber: 0,
			registers: new Map([
				["a", 100],
				["b", 11],
			]),
		};
		const newState = jumpIfEven.process("jie a, +2", initialState);
		expect(newState.lineNumber).toBe(2);
		expect(newState.registers.get("a")).toBe(100);
		expect(newState.registers.get("b")).toBe(11);
	});

	test("should process the line and not jump if register is odd", () => {
		const initialState: State = {
			lineNumber: 0,
			registers: new Map([
				["a", 101],
				["b", 11],
			]),
		};
		const newState = jumpIfEven.process("jie a, +2", initialState);
		expect(newState.lineNumber).toBe(1);
		expect(newState.registers.get("a")).toBe(101);
		expect(newState.registers.get("b")).toBe(11);
	});
});

describe("JumpIfOneFunction", () => {
	test('should match lines starting with "jio"', () => {
		expect(jumpIfOne.match("jio a, +2")).toBe(true);
		expect(jumpIfOne.match("jmp +2")).toBe(false);
	});

	test("should process the line and jump if register is one", () => {
		const initialState: State = {
			lineNumber: 0,
			registers: new Map([
				["a", 1],
				["b", 11],
			]),
		};
		const newState = jumpIfOne.process("jio a, +2", initialState);
		expect(newState.lineNumber).toBe(2);
		expect(newState.registers.get("a")).toBe(1);
		expect(newState.registers.get("b")).toBe(11);
	});

	test("should process the line and not jump if register is not one", () => {
		const initialState: State = {
			lineNumber: 0,
			registers: new Map([
				["a", 2],
				["b", 11],
			]),
		};
		const newState = jumpIfOne.process("jio a, +2", initialState);
		expect(newState.lineNumber).toBe(1);
		expect(newState.registers.get("a")).toBe(2);
		expect(newState.registers.get("b")).toBe(11);
	});
});
