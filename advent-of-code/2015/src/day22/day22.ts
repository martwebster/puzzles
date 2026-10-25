export const exampleFunction = (line: string): number | undefined => {
    return Number(line);
}


export interface Character{
    hitPoints: number
}


export interface Player extends Character{
   armour: number,
   specialArmour: number
   mana: number
   spells: Spell[]
}

export interface Boss extends Character{
    damage: number
}

export type SpellName = "Magic Missile"|"Drain"| "Shield"|"Poison"|"Recharge"

export interface Spell{
    name: SpellName,
    cost: number,
    duration: number
    damage?: number,
    heal?: number,
    armour?: number,
    funds?:number,
}



export const spells : Spell[] = [
    { name:"Magic Missile", cost: 53 , duration: 0, damage: 4},
    { name:"Drain"        , cost: 73 , duration: 0, damage: 2, heal: 2},
    { name:"Shield"       , cost: 113, duration: 6, armour: 7},
    { name:"Poison"       , cost: 173, duration: 6, damage: 3},
    { name:"Recharge"     , cost: 229, duration: 5, funds: 101}
]

export const display = (player: Player, boss: Boss) =>{
    const armour = player.armour + player.specialArmour;
    console.log(`- Player has ${player.hitPoints} points, ${armour} armour, ${player.mana} mana`)
    console.log(`- Boss has ${boss.hitPoints} points`)
}

export const applySpell = (player: Player, boss: Boss, spell: Spell) =>{
    console.log("Applying Spell ", spell.name, spell.duration)
    if (spell.damage!== undefined){
        boss.hitPoints = boss.hitPoints - spell.damage!
    }
    if (spell.heal!== undefined){
        player.hitPoints = player.hitPoints + spell.heal!
    }
    if (spell.armour!== undefined){
        player.specialArmour = spell.armour;
    }
    if (spell.funds!== undefined){
        player.mana = player.mana + spell.funds!
    }
}

export const applySpells = (player: Player, boss: Boss) =>{
    player.specialArmour = 0;
    player.spells.forEach (spell =>{
        applySpell(player,boss,spell) 
        spell.duration = spell.duration-1; 
    })
    player.spells = player.spells.filter (it => it.duration>0)
}

export const castSpell = (player: Player, boss: Boss, spell: Spell) =>{
    player.mana = player.mana - spell.cost
    if (spell.duration==0){
        applySpell(player,boss, spell)
    } else{
        player.spells.push( spell )
    }
}

export const castNamedSpell = (player: Player, boss: Boss, spellName: SpellName) =>{
    console.log("Player casts "+ spellName)
    const spell = spells.find(it => it.name===spellName)!
    castSpell(player, boss, spell)
}
