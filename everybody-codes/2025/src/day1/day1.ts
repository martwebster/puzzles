import { LinkedList } from "@puzzles/utils";


// Part 1
export const findName = (names: string, directions: string): string => {
    
    // Create a linked List that is not in a cirle
    var linkedNames = LinkedList.from(names.split(","), false);
    for (var direction of directions.split(",")){
        var duration = Number(direction.substring(1));
        direction.startsWith("L")
            ? linkedNames.previous(duration)
            : linkedNames.next(duration);
    }
    return linkedNames.currentItem.value;
}

// part 2
export const findCircleName = (names: string, directions: string): string|undefined => {
    
    // Create a linked List in a cirle, this true parameter joins the first and last together
    var linkedNames = LinkedList.from(names.split(","), true);
    
    for (var direction of directions.split(",")){
        var duration = Number(direction.substring(1));

        direction.startsWith("L")
            ? linkedNames.previous(duration)
            : linkedNames.next(duration);
        
        console.log(linkedNames.currentItem.value);
    }
    return linkedNames.currentItem.value;
}

// part 3
export const swapCircleName = (names: string, directions: string): string => {
    
    var linkedNames = LinkedList.from(names.split(","), true);

    for (var direction of directions.split(",")){
        var startName = linkedNames.currentItem;

        var duration = Number(direction.substring(1));
        
        const endName = direction.startsWith("L")
            ? linkedNames.previous(duration)
            : linkedNames.next(duration);

        linkedNames.swapValues(startName, endName);

        linkedNames.currentItem = linkedNames.items[0];
    }
    return linkedNames.currentItem.value;
}