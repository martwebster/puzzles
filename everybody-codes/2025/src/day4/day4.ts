export const calculatePart3 = (data: string[]): number => {
	const start = parseInt(data.first()!);
	const end = parseInt(data.last()!);

	const joinedGears = data.filter((line) => line.includes("|"));
	let previousGear = start;
	let ratio = 1;

	for (const gear of joinedGears) {
		const [leftGear, rightGear] = gear.split("|").toNumbers();
		ratio *= previousGear / leftGear;
		previousGear = rightGear;
	}

	ratio *= previousGear / end;
	return Math.trunc(ratio * 100);
};
