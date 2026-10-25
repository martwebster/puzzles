export const calculator = (lines: string[]): number | undefined => {
	var operations = lines.map((line) => {
		if (line.startsWith("-")) {
			return -Number(line.substring(1));
		}
		return Number(line.substring(1));
	});
	return operations.sum();
};

export const part2 = (lines: string[]): number | undefined => {
	var operations = lines.map((line) => {
		if (line.startsWith("-")) {
			return -Number(line.substring(1));
		}
		return Number(line.substring(1));
	});

	var currentValue = 0;
	var prevValues = new Set<number>();
	while (true) {
		for (const operation of operations) {
			currentValue += operation;
			if (prevValues.has(currentValue)) {
				return currentValue;
			}
			prevValues.add(currentValue);
		}
	}
	return -1;
};
