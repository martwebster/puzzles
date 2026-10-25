export const isPresent = (line: string, count: number): boolean => {
	var chars = line.split("");
	for (var char of chars) {
		if (line.indicesOf(char).length === count) {
			return true;
		}
	}
	return false;
};

export const count = (lines: string[], count: number): number => {
	return lines.filter((item) => isPresent(item, count)).length;
};

// part 2.
export const calcSameLetter = (line: string, line2: string): string => {
	var sameLetters = "";
	for (var i = 0; i < line.length; i++) {
		if (line[i] === line2[i]) {
			sameLetters = sameLetters + line[i];
		}
	}
	return sameLetters;
};

export const getSameLetter = (lines: string[]): string => {
	var maxLetterrs = "";
	for (const inner of lines) {
		for (const outer of lines) {
			if (inner === outer) {
				continue;
			}
			var same = calcSameLetter(inner, outer);
			if (same.length > maxLetterrs.length) {
				maxLetterrs = same;
			}
		}
	}
	return maxLetterrs;
};
