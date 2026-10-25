import { repeat } from "@puzzles/utils";

// part 1
export const multiply = ({ x: x1, y: y1 }: Pos, { x: x2, y: y2 }: Pos): Pos => {
	var x = x1 * x2 - y1 * y2;
	var y = x1 * y2 + y1 * x2;
	return { x, y };
};

export const addition = ({ x: x1, y: y1 }: Pos, { x: x2, y: y2 }: Pos): Pos => {
	var x = x1 + x2;
	var y = y1 + y2;
	return { x, y };
};

export const division = ({ x: x1, y: y1 }: Pos, { x: x2, y: y2 }: Pos): Pos => {
	var x = Math.trunc(x1 / x2);
	var y = Math.trunc(y1 / y2);
	return { x, y };
};

export const cycle = (value: Pos): string => {
	var current = { x: 0, y: 0 };
	repeat(3, () => {
		current = multiply(current, current);
		current = division(current, { x: 10, y: 10 });
		current = addition(current, value);
	});
	return `[${current.x},${current.y}]`;
};

// Part 2 and 3
export const calculateOpCorner = (start: Pos): Pos => {
	return addition(start, { x: 1000, y: 1000 });
};

export const shouldBeEngraved = (val: Pos): boolean => {
	var current = { x: 0, y: 0 };

	for (var x = 0; x < 100; x++) {
		current = multiply(current, current);
		current = division(current, { x: 100000, y: 100000 });
		current = addition(current, val);
		if (
			current.x > 1000000 ||
			current.y > 1000000 ||
			current.x < -1000000 ||
			current.y < -1000000
		) {
			return false;
		}
	}
	return true;
};

export const engrave = (start: Pos, size: number = 100): number => {
	var end = calculateOpCorner(start);
	var step = (end.y - start.y) / size;
	var engravings = 0;
	for (var y = start.y; y <= end.y; y = y + step) {
		for (var x = start.x; x <= end.x; x = x + step) {
			if (shouldBeEngraved({ x, y })) {
				engravings++;
			}
		}
	}
	return engravings;
};
