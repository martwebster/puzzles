export const exampleFunction = (line: string): number | undefined => {
	return Number(line);
};

export const getFreeLeft = (numbers: Array<Array<number>>, val: number) => {
	for (var x = 0; x < numbers.length; x++) {
		if (numbers[x][0] === 0 && val < numbers[x][1].valueOf()) {
			return x;
		}
	}
	return -1;
};

export const getFreeRight = (numbers: Array<Array<number>>, val: number) => {
	for (var x = 0; x < numbers.length; x++) {
		if (numbers[x][2] === 0 && val > numbers[x][1].valueOf()) {
			return x;
		}
	}
	return -1;
};

export interface Spine {
	index: number;
	spine: Array<Array<number>>;
	levelScores: Array<number>;
	spineScore: number;
}

export const calcLevelScore = (level: number[]): number => {
	var filtered = level
		.filter((num) => num.valueOf() > 0)
		.map((it) => it.toString());
	var result = Number(filtered.join(""));
	return result;
};

export const constructSpine = (line: string): Spine => {
	var numbers = line.substringAfter(":")?.split(",")!.toNumbers();
	var spine: Array<Array<number>> = [];
	spine.push([0, 0, 0]);
	for (var number of numbers!) {
		if (spine.last()![1] === 0) {
			spine.last()![1] = number;
			continue;
		}
		if (number < spine.last()![1].valueOf()) {
			var free = getFreeLeft(spine, number);
			if (free > -1) {
				spine[free][0] = number;
				continue;
			}
		}
		if (number > spine.last()![1].valueOf()) {
			var free = getFreeRight(spine, number);
			if (free > -1) {
				spine[free][2] = number;
				continue;
			}
		}
		spine.push([0, 0, 0]);
		spine.last()![1] = number;
	}

	return {
		index: Number(line.substringBefore(":")),
		spine,
		spineScore: Number(spine.map((it) => it[1]).join("")),
		levelScores: spine.map((it) => calcLevelScore(it)),
	};
};
