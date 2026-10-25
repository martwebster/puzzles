export const exampleFunction = (line: string): number | undefined => {
	return Number(line);
};
// to find the child, we need to determine how close it is to the others

export const findChild = (lines: string[]): number => {
	var maxCount = -1;
	var child = -1;
	for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		var comp1 = 1;
		var comp2 = 2;

		if (lineIndex === 1) {
			comp1 = 0;
			comp2 = 2;
		}
		if (lineIndex === 2) {
			comp1 = 0;
			comp2 = 1;
		}

		var count = lines[lineIndex]
			.split("")
			.filter(
				(it, index) => it === lines[comp1][index] || it === lines[comp2][index],
			).length;
		if (count > maxCount) {
			child = lineIndex;
			maxCount = count;
		}
	}
	return child;
};

export const findScores = (lines: string[]): number[] => {
	var matchingScores: number[] = [];

	for (var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
		var comparisons = lines
			.removeAtIndex(lineIndex)
			.map((it) => it.substring(2));
		var line = lines[lineIndex].substring(2).split("");

		var counts = comparisons.map(
			(it) => it.split("").filter((char, index) => char === line[index]).length,
		);

		matchingScores.push(counts[0] * counts[1]);
	}
	return matchingScores;
};

const findParentForChild = (
	lines: string[],
	childIndex: number,
): string | undefined => {
	var child = lines[childIndex].substringAfter(":")!.split("");
	for (var par1 = 0; par1 < lines.length; par1++) {
		if (par1 === childIndex) {
			continue;
		}
		var parent1 = lines[par1].substringAfter(":")!.split("");
		for (var par2 = 0; par2 < lines.length; par2++) {
			if (par2 === childIndex || par2 === par1) {
				continue;
			}

			var parent2 = lines[par2].substringAfter(":")!.split("");

			var count = child.filter(
				(it, index) => it === parent1[index] || it === parent2[index],
			).length;

			if (count === child.length) {
				return `${par1}:${par2}`;
			}
		}
	}
	return undefined;
};

export const calculateScore = (child: string, parent: string): number => {
	var childData = child.substringAfter(":")!.split("");
	return parent
		.substringAfter(":")!
		.split("")
		.filter((item, index) => item === childData[index]).length;
};

export const findParents2 = (lines: string[]): number => {
	var total = 0;
	// for everyone
	for (var childIndex = 0; childIndex < lines.length; childIndex++) {
		var parents = findParentForChild(lines, childIndex);
		if (parents) {
			var [parent1, parent2] = parents.split(":").toNumbers();
			var score1 = calculateScore(lines[childIndex], lines[parent1]);
			var score2 = calculateScore(lines[childIndex], lines[parent2]);
			total = total + score1 * score2;
		}
	}
	return total;
};

export const findParents3 = (lines: string[]): number => {
	var families: Array<Set<number>> = [];
	// for everyone
	for (var childIndex = 0; childIndex < lines.length; childIndex++) {
		var parents = findParentForChild(lines, childIndex);
		if (parents) {
			var child = childIndex + 1;
			var parent1 = Number(parents.substringBefore(":")) + 1;
			var parent2 = Number(parents.substringAfter(":")) + 1;
			var found = families.filter(
				(set) => set.has(child) || set.has(parent1) || set.has(parent2),
			);
			if (found.length === 0) {
				var newSet = new Set<number>();
				newSet.add(parent1);
				newSet.add(parent2);
				newSet.add(child);
				families.push(newSet);
			} else {
				found[0].add(child);
				found[0].add(parent1);
				found[0].add(parent2);

				if (found.length > 1) {
					for (var others = 1; others < found.length; others++) {
						found[others].forEach((entry) => {
							found[0].add(entry);
						});
						var index = families.indexOf(found[others]);
						families = families.removeAtIndex(index);
					}
				}
			}
		}
	}
	var maxFamilies = families.maxOf((it) => it.size);
	var familtAtMax = families.find((it) => it.size == maxFamilies);

	var total = 0;
	familtAtMax?.forEach((value) => (total = total + value));

	console.log(families);
	return total;
};
