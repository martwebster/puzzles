export type State = {
	lineNumber: number;
	registers: Map<string, number>;
};

export namespace State {
	export const displayState = (state: State) => {
		console.log("Line number", state.lineNumber);
		console.log("Registers: ", state.registers);
	};
}

export type Operation = {
	match: (line: string) => boolean;
	process: (line: string, state: State) => State;
};

export const half: Operation = {
	match: (line) => line.startsWith("hlf"),
	process: (line: string, { lineNumber, registers }: State): State => {
		const register = line.split(" ")[1];
		const newRegisters = new Map(registers);

		return {
			lineNumber: lineNumber + 1,
			registers: newRegisters.set(register, (registers.get(register) || 0) / 2),
		};
	},
};

export const triple: Operation = {
	match: (line) => line.startsWith("tpl"),
	process: (line: string, state: State): State => {
		const register = line.split(" ")[1];
		const registers = new Map(state.registers);

		return {
			lineNumber: state.lineNumber + 1,
			registers: registers.set(register, (registers.get(register) || 0) * 3),
		};
	},
};

export const increment: Operation = {
	match: (line) => line.startsWith("inc"),
	process: (line: string, state: State): State => {
		const register = line.split(" ")[1];
		const registers = new Map(state.registers);

		return {
			lineNumber: state.lineNumber + 1,
			registers: registers.set(register, (registers.get(register) || 0) + 1),
		};
	},
};

export const jump: Operation = {
	match: (line) => line.startsWith("jmp"),
	process: (line: string, state: State): State => {
		let relative = line.split(" ")[1];
		if (relative.startsWith("+")) {
			relative = relative.substring(1);
		}
		return {
			lineNumber: state.lineNumber + Number(relative),
			registers: state.registers,
		};
	},
};

export const jumpIfEven: Operation = {
	match: (line) => line.startsWith("jie"),
	process: (line: string, state: State): State => {
		const register = line.split(" ")[1].substringBefore(",");
		let relative = line.split(" ")[2];
		if (relative.startsWith("+")) {
			relative = relative.substring(1);
		}
		var lineNumber = state.lineNumber;
		const registerValue = state.registers.get(register!) || 0;
		if (registerValue % 2 === 0) {
			lineNumber = lineNumber + Number(relative);
		} else {
			lineNumber++;
		}
		return {
			lineNumber,
			registers: state.registers,
		};
	},
};

export const jumpIfOne: Operation = {
	match: (line) => line.startsWith("jio"),
	process: (line: string, state: State): State => {
		const register = line.split(" ")[1].substringBefore(",");
		let relative = line.split(" ")[2];
		if (relative.startsWith("+")) {
			relative = relative.substring(1);
		}
		var lineNumber = state.lineNumber;
		const registerValue = state.registers.get(register!) || 0;
		if (registerValue === 1) {
			lineNumber = lineNumber + Number(relative);
		} else {
			lineNumber++;
		}
		return {
			lineNumber,
			registers: state.registers,
		};
	},
};

const operations = [half, triple, increment, jump, jumpIfEven, jumpIfOne];

export const compute = (
	instructions: string[],
	initialState?: State,
): State => {
	let state: State = initialState ?? { lineNumber: 0, registers: new Map() };

	while (state.lineNumber < instructions.length) {
		var instuctionLine = instructions[state.lineNumber];
		var foundOperation = operations.find((operation) =>
			operation.match(instuctionLine),
		)!;
		state = foundOperation.process(instuctionLine, state);
	}
	return state;
};
