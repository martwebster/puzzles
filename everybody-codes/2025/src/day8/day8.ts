export const countCenters = (line: string, size: number): number => {
	var nums = line.split(",").toNumbers();
	var total = 0;
	var center = size / 2;
	for (var x = 0; x < line.length - 1; x++) {
		if (Math.abs(nums[x] - nums[x + 1]) === center) {
			total++;
		}
	}
	return total;
};

export const splitPaths = (from: number, to: number) => {
	var largest = Math.max(from, to);
	var smallest = Math.min(from, to);
	var path1 = from - to;
	var path2 = 8 - largest + smallest;

	var result: Array<Array<number>> = [];
};

export const countNots = (line: string, size: number): number => {
	var nums = line.split(",").toNumbers();
	var total = 0;
	var center = size / 2;
	for (var x = 0; x < line.length - 1; x++) {
		var lineFrom = line[x];
		var lineTo = line[x + 1];

		// knot is formed if there exists another line who starts or ends, between the shortest
		// path between two numbers.
	}
	return total;
};
