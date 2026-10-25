export const countSwordfightingPairs = (line: string): number => {
	var total = 0;
	var mentors = 0;
	for (var char of line) {
		if (char === "A") {
			mentors++;
		}
		if (char === "a") {
			total = total + mentors;
		}
	}
	return total;
};

export const countPairs = (line: string): number => {
	var total = 0;
	var mentors: number[] = Array(26).fill(0);
	for (var char of line) {
		var charCode = char.charCodeAt(0);

		if (charCode >= 97) {
			total = total + mentors[charCode - 97];
		} else {
			var index = charCode - 65;
			mentors[index]++;
		}
	}
	return total;
};

// seach block has to be smarter,
// needs to know the currentPosition, distance to know whether to repeat
// to know max lengh of search string.

export const calculateSearchBlock = (
	line: string,
	index: number,
	distance: number,
	repeatStart: boolean,
	repeatEnd: boolean,
) => {
	var startPos = index - distance;
	var searchString = "";
	if (startPos < 0 && repeatStart) {
		searchString = line.substring(line.length + startPos);
	}
	var endPos = index + distance;
	if (endPos < line.length) {
		searchString =
			searchString + line.substring(Math.max(startPos, 0), endPos + 1);
	} else if (endPos >= line.length) {
		searchString = searchString + line.substring(Math.max(startPos, 0));
	}
	if (endPos >= line.length && repeatEnd) {
		searchString = searchString + line.substring(0, endPos - line.length + 1);
	}
	return searchString;
};

export const calculateBlock = (
	line: string,
	distance: number,
	repeatStart: boolean,
	repeatEnd: boolean,
): number => {
	var total = 0;
	for (var index = 0; index < line.length; index++) {
		var charCode = line[index].charCodeAt(0);
		// lowercase
		if (charCode >= 97) {
			var searchString = calculateSearchBlock(
				line,
				index,
				distance,
				repeatStart,
				repeatEnd,
			);
			var charToFind = line[index].toUpperCase();
			var count = searchString.indicesOf(charToFind).length;
			total = total + count;
			console.log(charToFind, count);
		}
	}
	return total;
};

/**
 *
 * This only works if the distance is less than the line length
 */
export const countPairsinTents = (
	line: string,
	distance: number,
	repeat: number,
): number => {
	if (repeat === 1) {
		return calculateBlock(line, distance, false, false);
	}

	if (repeat === 2) {
		return (
			calculateBlock(line, distance, false, true) +
			calculateBlock(line, distance, true, false)
		);
	}

	var start = calculateBlock(line, distance, false, true);
	var middle = calculateBlock(line, distance, true, true);
	var end = calculateBlock(line, distance, true, false);

	return start + middle * (repeat - 2) + end;
};
