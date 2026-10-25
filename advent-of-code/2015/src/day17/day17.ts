export interface Container{
    volume: number;
    id: number;
}

export interface Option {
    containers: Container[],
    containersUsed: number[],
    totalSoFar: number
}

export const expandOption = (option: Option, total: number): Option[] => {
    return option.containers
        .filter(container => option.totalSoFar + container.volume <= total)
        .map(container => ({
            containers : option.containers.removeAtIndex(option.containers.indexOf(container)),
            totalSoFar : option.totalSoFar + container.volume,
            containersUsed: [...option.containersUsed, container.id].sortAscending(),
        }))
}

export const prune = (options: Option[]): Option[] =>{
    return options
        .removeDuplicateItems( option => option.containersUsed.sortAscending().join("-") )
}

export const getWays =  (containers: number[], total:number) :string[] =>{
    const option: Option = {
        containers: [...containers.map( ((item: number, index: number) => ({id: index, volume: item})))],
        totalSoFar:0,
        containersUsed: [],
    }
    let options = [option]
    let finalOptions = new Set<string>();
    while (options.length > 0){
        options = options.flatMap( it => expandOption(it, total))
        options = prune(options)
        options
            .filter(it=> it.totalSoFar===total)
            .map(it => it.containersUsed.sortAscending().join(","))
            .forEach( it=> finalOptions.add(it))
    }
    return Array.from(finalOptions);
}

export const getMinContainers =  (containers: number[], total:number) :number =>{
    const finalOptions =
        getWays(containers, total).map( it => it.split(","))

    const minSize = finalOptions.minOf( it => it.length)!
    const totalOfMin = finalOptions.filter( it => it.length == minSize);
    return totalOfMin.length;
}