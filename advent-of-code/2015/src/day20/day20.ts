export const getDivisors = (target: number): number[] => {
    const result: number[] = [];
    for (let i = 1; i <= target; i++) {
        if (target % i === 0) {
            result.push(i);
        }
    }
    return result;
}

export const findHouse = (): number => {
    for (let i = 1; i <= 29000000; i++) {
        if (getDivisors(i).sumOf(o => o * 10)> 29000000){
            return i;
        }
    }
    return -1;
}


// The Elves decide they don't want to visit an infinite number of houses. Instead, each Elf will stop after 
// delivering presents to 50 houses. 
// To make up for it, they decide to deliver presents equal to eleven times their number at each house.

// With these changes, what is the new lowest house number of the house to get at least as many presents 
// as the number in your puzzle input?
// 29000000

export const findHouseWithLimitedElves = (target: number): number =>{
    var elf = 1;
    // Map of presents per house.
    var houses : Map<number, number> = new Map();
    while ((houses.get(elf) || 0) < target){
        houses.delete(elf)
        elf++;
        for (let delivery = 1; delivery <= 50; delivery++) {
            const houseNumber = elf * delivery;
            houses.set(houseNumber, (houses.get(houseNumber) || 0) + (elf * 11) )
        }
    }
    return elf
}