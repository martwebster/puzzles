import {Position} from "@puzzles/utils";

export type Grid = boolean[][];

export const buildGrid = (lines:string[]): Grid =>{
    return lines.map( line => line.split("").map (bit => bit != "."))
}

export const isCorner =  (grid: Grid, {x,y}: Pos) : boolean =>{
    if (x ==0 && y==0){
        return true;
    }
    // top right
    if (x == grid[y].length-1 && y==0){
        return true;
    }
    // bottom left
    if (x ==0 && y==grid.length-1){
        return true;
    }
    // bottom right
    return x == grid[y].length - 1 && y == grid.length - 1;

}

export const isOnAtPos = (grid: Grid, {x,y}: Pos) : boolean =>{
    if (y<0 || y >= grid.length){
        return false;
    }
    if (x<0 || x >= grid[y].length){
        return false;
    }
    return grid[y][x]
}

export const displayGrid = (grid:Grid) =>{
    console.log("----")
    grid.forEach(line =>{
        console.log( line.map( it => it? "#":".").join(""))
    })
}

export const step = (grid: Grid, cornersStuck: boolean = false): boolean[][] =>{
    const newGrid: boolean[][] = [];

    for (let y = 0; y < grid.length; y++){
        const currentRow: boolean[] = [];
        for (let x = 0; x < grid[y].length; x++){
            const currentPos = {x, y};
            if (cornersStuck && isCorner(grid, currentPos)){
                currentRow.push(true)
            } else{
                const neighbours = Position.adjacent(currentPos, true);
                const onNeighbours = neighbours.countOf(pos => isOnAtPos(grid, pos))
                if (isOnAtPos(grid, currentPos)){
                    currentRow.push( onNeighbours == 2 || onNeighbours==3)
                } else{
                    currentRow.push( onNeighbours == 3)
                }
            }
        }
        newGrid.push(currentRow)
    }
    return newGrid
}

export const countLights = (grid: Grid): number =>{
    return grid.sumOf( row => row.countOf( it => it))
}