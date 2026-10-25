export interface Sue {
    id: number;
    props : Map<string, number>
}

export namespace Sue {
    export const of = (data:string[]): Sue[] =>{
        return data.map( line =>{
            const sue : Sue = {
                id: Number(line.substringBetween("Sue", ":")),
                props : new Map<string,number>(),
            }
            const propLine = line.substringAfter(": ")!
            const props = propLine.split(", ")
            props.forEach( prop =>{
                sue.props.set(prop.substringBefore(":")!, Number(prop.substringAfter(":")))
            })
            return sue;
        })
    }
}

export const findExactSue = (sues: Sue[], machine: Map<string, number>): number =>{
    return sues.find(sue => {
        let match = true;
        machine.forEach((machineValue: number, machineKey: string) =>{
            const sueValue = sue.props.get(machineKey);
            if (sueValue != undefined && sueValue != machineValue) {
                match = false
            }
        })
        return match;
    })!.id;
}

export const findRangesSue = (sues: Sue[], lessThan: Map<string, number>, equal: Map<string, number>, greaterThan: Map<string, number>): number =>{
    return sues.find(sue => {
        let match = true;

        lessThan.forEach((machineValue: number, machineKey: string) =>{
            const sueValue = sue.props.get(machineKey);
            if (sueValue != undefined && sueValue >= machineValue) {
                match = false
            }
        })

        equal.forEach((machineValue: number, machineKey: string) =>{
            const sueValue = sue.props.get(machineKey);
            if (sueValue != undefined && sueValue != machineValue) {
                match = false
            }
        })

        greaterThan.forEach((machineValue: number, machineKey: string) =>{
            const sueValue = sue.props.get(machineKey);
            if (sueValue != undefined && sueValue <= machineValue) {
                match = false
            }
        })

        return match;
    })!.id;
}
