//Boss
// Hit Points: 109
// Damage: 8
// Armor: 2

export const exampleFunction = (line: string): number | undefined => {
    return Number(line);
}

export interface Item { 
    name: string,
    cost: number,
    damage: number
    armour: number,
}

const weapons : Item[] = [
    { name: "Dagger", cost:8, damage: 4, armour: 0},
    { name: "Shortsword" ,cost:  10, damage: 5, armour:  0},
    { name: "Warhammer"  ,cost:  25, damage: 6, armour:  0},
    { name: "Longsword"  ,cost:  40, damage: 7, armour:  0},
    { name: "Greataxe"   ,cost:  74, damage: 8, armour:  0} 
]

const armors : Item[] = [
     { name: "None",       cost: 0,   damage:0, armour:0},
     { name: "Leather"   , cost:  13, damage:0, armour:1},
     { name: "Chainmail" , cost:  31, damage:0, armour:2},
     { name: "Splintmail", cost:  53, damage:0, armour:3},
     { name: "Bandedmail", cost:  75, damage:0, armour:4},
     { name: "Platemail" , cost: 102, damage:0, armour:5}
]

const rings : Item[] = [
     { name: "None 1", cost: 0,   damage:0, armour:0},
     { name: "None 2", cost: 0,   damage:0, armour:0},
     { name: "Damage +1" , cost: 25, damage:1, armour:0},
     { name: "Damage +2" , cost: 50, damage:2, armour:0},
     { name: "Damage +3" , cost:100, damage:3, armour:0},
     { name: "Defense +1", cost: 20, damage:0, armour:1},
     { name: "Defense +2", cost: 40, damage:0, armour:2},
     { name: "Defense +3", cost: 80, damage:0, armour:3}
]

export interface Character {
    hitpoints: number,
    armour: number,
    damange: number
}

export const getCheapestWin = (boss: Character) =>{
    var cheapestWin = Number.MAX_VALUE;
    for (const weapon of weapons) {
        for (const armor of armors) {
            for (const ring1 of rings) {
                for (const ring2 of rings.filter(it => it.name !== ring1.name)) {
                    const items = [ weapon, armor, ring1, ring2]
                    const player : Character = {
                        hitpoints:100,
                        damange: items.sumOf (it => it.damage),
                        armour: items.sumOf (it => it.armour)
                    }
                    if (playerWins(player, boss)){
                        const cost = items.sumOf (it => it.cost)
                        cheapestWin = Math.min(cheapestWin ,cost)
                    }
                }
            }
        }   
    }
    return cheapestWin;
}

export const getExpensiveLoss = (boss: Character) =>{
    var expensiveLoss = Number.MIN_VALUE;
    for (const weapon of weapons) {
        for (const armor of armors) {
            for (const ring1 of rings) {
                for (const ring2 of rings.filter(it => it.name !== ring1.name)) {
                    const items = [ weapon, armor, ring1, ring2]
                    const player : Character = {
                        hitpoints:100,
                        damange: items.sumOf (it => it.damage),
                        armour: items.sumOf (it => it.armour)
                    }
                    if (!playerWins(player, boss)){
                        const cost = items.sumOf (it => it.cost)
                        expensiveLoss = Math.max(expensiveLoss ,cost)
                    }
                }
            }
        }   
    }
    return expensiveLoss;
}

function playerWins(player: Character, boss: Character): boolean {
    var bossHitpoints = boss.hitpoints;
    var playerHitPoints = player.hitpoints;
    
    while (true){
        bossHitpoints -= Math.max(1, player.damange - boss.armour);;
        if (bossHitpoints<=0){
            return true;
        }
        
        playerHitPoints -= Math.max(1, boss.damange - player.armour);
        if (playerHitPoints<=0){
            return false;
        }
    }
}

