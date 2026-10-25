interface Replacement{
    source: string;
    replacement: string;
}

function buildReplacementMap(replacements: string[]): Replacement[] {
    return replacements.map(replacement => ({
        source: replacement.substringBefore(" =")!,
        replacement: replacement.substringAfter("> ")!,
    }));
}

export const replaceMolecules = (replacements: string[],
                                 start: string): string[] => {
    const replacementMap = buildReplacementMap(replacements);

    const results = new Set<string>();

    for (let i = 0; i < start.length; i++) {
        const bit = start.charAt(i);

        replacementMap
            .filter( item => item.source === bit)
            .forEach( item => {
                results.add( start.substring(0,i) + item.replacement + start.substring(i+1) );
            })

        if (i+1 < start.length) {
            const bit2 = start.charAt(i) + start.charAt(i+1);
            replacementMap
                .filter( item => item.source === bit2)
                .forEach( item => {
                    results.add( start.substring(0,i) + item.replacement + start.substring(i+2) );
                })
        }
    }

    return Array.from(results);
}
export const fabricate = (replacements: Array<string>, target: string) => {
    var molecules = ["e"]
    let steps = 0;
    while (molecules.find( it => it ===target)=== undefined) {
        molecules = molecules.flatMap( item => replaceMolecules(replacements, item) );
        steps++
        molecules = molecules.filter( it => it.length <= target.length)
        molecules = molecules.removeDuplicates();
    }
    return steps
};


export const countStr = (source: string, item: string): number =>{
    var count = 0;
    for (var index = source.indexOf(item); index >= 0; index = source.indexOf(item, index + 1), ++count) { }
    return count;
}

export const countBits= (target: string): number => {

    const uppers = target.split("").countOf( it => it == it.toUpperCase())

    return uppers - countStr(target, "Rn") - countStr(target, "Ar") - 2 * countStr(target, "Y") - 1;
}

