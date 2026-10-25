export type Rules = Map<string, Array<string>>;

export const buildRules = (line: string[]): Rules => {
	var map = new Map<string, Array<string>>();
	line.forEach((rule) => {
		map.set(
			rule.substringBefore(" > ")!,
			rule.substringAfter(" > ")!.split(","),
		);
	});
	return map;
};

export const passName = (name: string, rules: Rules): boolean => {
	for (var index = 0; index < name.length - 1; index++) {
		var letter = name[index];
		var nextLetter = name[index + 1];
		if (!rules.get(letter)?.includes(nextLetter)) {
			return false;
		}
	}
	return true;
};

export const findName = (names: string, rules: Rules): string | undefined => {
	return names.split(",").find((it) => passName(it, rules));
};

export const countNames = (names: string, rules: Rules): number => {
	var allNames = names.split(",").filter((it) => it.length > 0);

	var total = 0;
	for (var index = 0; index < allNames.length; index++) {
		if (passName(allNames[index], rules)) {
			console.log("Passed", allNames[index]);
			total = total + index + 1;
		}
	}
	return total;
};

export const spawnName = (name: string, rules: Rules): Array<string> => {
	var nextLetters = rules.get(name.lastChar()!);
	if (nextLetters) {
		return nextLetters!.map((it) => name + it).filter((it) => it.length < 12);
	}
	return [];
};

export const countNewNames = (names: string, rules: Rules): number => {
	var allNames = names.split(",").filter((it) => it.length > 0);
	var startNames = allNames.filter((it) => passName(it, rules));

	var currentNames = [...startNames];
	var goodNames = new Set<string>();
	while (currentNames.length > 0) {
		currentNames = currentNames.flatMap((it) => spawnName(it, rules));
		currentNames
			.filter((it) => it.length >= 7)
			.forEach((it) => {
				goodNames.add(it);
			});
	}
	return goodNames.size;
};
