import {describe, expect, test} from "vitest";
import './extensions';


describe('Array', () => {
    test('chunk', () => {
        expect([1,2,3,4].chunk(1)).toStrictEqual([[1],[2],[3],[4]])
        expect([1,2,3,4].chunk(2)).toStrictEqual([[1,2],[3,4]])
        expect([1,2,3,4].chunk(3)).toStrictEqual([[1,2,3],[4]])
        expect([1,2,3,4].chunk(4)).toStrictEqual([[1,2,3,4]])
        expect([1,2,3,4].chunk(5)).toStrictEqual([[1,2,3,4]])
    })

    test('countOf', () => {
        expect([1,1,3,4].countOf( item => item==1)).toBe(2)
        expect(["1","1","3","4"].countOf( item => item=="1")).toBe(2)
        expect([1,1,3,4].countOf( item => item==0)).toBe(0)
        expect([].countOf( item => item==0)).toBe(0)
    })

    test('factory', ()=>{
        // Creates a grid based upon the array of strings
        const grid = ["ABC"].factory( (item: string, pos: Pos)=>{
            return {
                content: item,
                pos,
            }
        });
        expect(grid[0][0]).toStrictEqual({
            content: 'A',
            pos: {x:0,y:0}
        })
    })

    test('first', () => {
        expect([].first()).toBeUndefined();
        expect([1,2].first()).toBe(1)
    })

    test('groupByCount', () => {
        expect([].groupByCount()).toStrictEqual(new Map())
        expect([1,1].groupByCount().get(1)).toBe(2)
        expect([1,1].groupByCount().get(2)).toBeUndefined()
    })
    
    test('includes object', ()=>{
        const item =  {
            inner: "A"
        }
        const item2 = {
            inner: "B"
        }
        expect ([item, item2].includesObject( {
            inner: "A"
        })).toBe(true)
        expect ([item, item2].includesObject( {
            inner: "C"
        })).toBe(false)
    });

    test('indicesOf',()=>{
        expect([0,1,1,2].indicesOf(1)).toStrictEqual([1,2])
        expect([0,1,1,2].indicesOf(3)).toStrictEqual([])
    })
    test('insertItemAt',()=>{
        expect([0,1,2].insertAt(9,0)).toStrictEqual([9,0,1,2])
        expect([0,1,2].insertAt(9,1)).toStrictEqual([0,9,1,2])
        expect([0,1,2].insertAt(9,2)).toStrictEqual([0,1,9,2])
        expect([0,1,2].insertAt(9,100)).toStrictEqual([0,1,2,9])
    })

    test('last', () => {
        expect([].last()).toBeUndefined();
        expect([1,2].last()).toBe(2)
    })

    test('max', () => {
        expect([1].max()).toBe(1);
        expect([-1,-2].max()).toBe(-1);
        expect([1,2].max()).toBe(2);
        expect([].max()).toBeUndefined();
    })

    test('maxOf', ()=>{
        const item =  {
            inner: 2
        }
        const item2 = {
            inner: 1
        }
        expect ([item, item2]
            .maxOf( item => item.inner)
        ).toBe(2)
    });

    test('min', () => {
        expect([1].min()).toBe(1);
        expect([-1,-2].min()).toBe(-2);
        expect([1,2].min()).toBe(1);
        expect([].min()).toBeUndefined();
    })

    test('minOf', ()=>{
        const item =  {
            inner: 2
        }
        const item2 = {
            inner: 1
        }
        expect ([item, item2]
            .minOf( item => item.inner)
        ).toBe(1)
    });

    test('removeAtIndex',()=>{
        expect([0,1,2].removeAtIndex(0)).toStrictEqual([1,2])
        expect([0,1,2].removeAtIndex(1)).toStrictEqual([0,2])
        expect([0,1,2].removeAtIndex(2)).toStrictEqual([0,1])
        expect([0,1,2].removeAtIndex(100)).toStrictEqual([0,1,2])
    })

    test('removeDuplicates',()=>{
        expect([0,0,1,1,2].removeDuplicates()).toStrictEqual([0,1,2])
        expect(["A","A","B"].removeDuplicates()).toStrictEqual(["A","B"])
        expect([].removeDuplicates()).toStrictEqual([])
    })

    test('scan',()=>{
        expect(["012345","67890"].scan( item=> item =="4"))
            .toStrictEqual([{
                x: 4,
                y: 0
            }])
        expect(["012345","67890"].scan( item=> item =="A"))
            .toStrictEqual([])
    })

    test('sortAscending',()=>{
        expect( [].sortAscending()).toStrictEqual([])
        expect( [2,1,3].sortAscending()).toStrictEqual([1,2,3])
        expect( ["B","A","C"].sortAscending()).toStrictEqual(["A","B","C"])
    });

    test('sortDescending',()=>{
        expect( [].sortDescending()).toStrictEqual([])
        expect( [2,1,3].sortDescending()).toStrictEqual([3,2,1])
        expect( ["B","A","C"].sortDescending()).toStrictEqual(["C","B","A"])
    });



    test('toPositions',()=>{
        expect([].toPositions()).toStrictEqual([]);
        expect(["01","23"].toPositions()).toStrictEqual(
            [
                {x:0,y:0},
                {x:1,y:0},
                {x:0,y:1},
                {x:1,y:1},
            ]
        );
        expect([[0,1],[2,3]].toPositions()).toStrictEqual(
            [
                {x:0,y:0},
                {x:1,y:0},
                {x:0,y:1},
                {x:1,y:1},
            ]
        );
    })
})