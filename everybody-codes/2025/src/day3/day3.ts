
// Part 1
export const findContainers = (line: string): number | undefined => {
    var numbers =  line.split(",").toNumbers();
    return Array.from(new Set(numbers)).sum();
}

// Part 2
export const findLowestContainer = (line: string): number | undefined => {

    var numbers =  line.split(",").toNumbers();

    return Array.from(new Set(numbers))
        .sortAscending()
        .slice(0,20)
        .sum();
}

// Part 3
export const packCreates = (line: string): number | undefined => {

    var numbers =  line.split(",").toNumbers();

    var groups = numbers.groupByCount();

    return Array.from(groups.entries())
        .sort((a, b) => b[1] - a[1])
        .first()?.[1]
}
