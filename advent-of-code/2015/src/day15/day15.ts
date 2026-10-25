export interface IngredientProps {
    capacity: number,
    durability: number,
    flavor: number
    texture: number,
    calories: number,
}

export interface Ingredient extends IngredientProps {
    name: string,
}

export namespace Ingredient {
     export const of =  (data: string[]): Ingredient[] => {
         return data.map( item => {
             const props = item.split(",")
             return {
                 name: props[0].substringBefore(":")!,
                 capacity: Number(props[0].substringAfter("capacity")),
                 durability: Number(props[1].substringAfter("durability")),
                 flavor: Number(props[2].substringAfter("flavor")),
                 texture: Number(props[3].substringAfter("texture")),
                 calories: Number(props[4].substringAfter("calories")),
             }
         })
    }
}

const generateVariations = (variations: number[], max:number): number[][] =>{
    const total = variations.sum();
    const result: number[][] = [];
    for (let c = 0; c <= max-total; c++) {
        result.push([...variations, c]);
    }
    return result;
}

export const generateArrays = (count: number, total: number): number[][] =>{
    let result: number[][] = [[]];
    while (count>1){
        result = result.flatMap(array => generateVariations(array, total));
        count--;
    }
    result.forEach( array => array.push(total - array.sum()))
    return result;
}

export const getTotal =  (ingredients: Ingredient[], values: number[]): IngredientProps =>{
    let total : IngredientProps = {
        capacity: 0,
        durability: 0,
        flavor: 0,
        texture: 0,
        calories: 0,
    }
    for (let index = 0; index < ingredients.length; index++) {
        const count = values[index];
        if (count>0){
            const ingredient = ingredients[index];
            total.capacity += count * ingredient.capacity;
            total.durability += count * ingredient.durability;
            total.flavor += count * ingredient.flavor;
            total.texture += count * ingredient.texture;
            total.calories += count * ingredient.calories;
        }
    }
    total.capacity = Math.max(0,total.capacity)
    total.durability = Math.max(0,total.durability);
    total.flavor = Math.max(0,total.flavor);
    total.texture = Math.max(0,total.texture);
    total.calories = Math.max(0,total.calories);
    return total;
}

export const getTotalScore =(total: IngredientProps): number =>{
    return total.capacity * total.durability * total.flavor * total.texture;
}

export const getMaxScore = (
    ingredients: Ingredient[], maxCals?: number): number => {
    let max = 0;
    for (let option of generateArrays(4,100)) {
        const total = getTotal(ingredients, option);
        const score = getTotalScore(total);
        if (maxCals!= undefined) {
            if (total.calories == maxCals) {
                max = Math.max(max, score);
            }
        } else{
            max = Math.max(max, score);
        }
    }
    return max;
}