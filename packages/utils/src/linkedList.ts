
export class LinkedNode<T> {
    value: T;
    previous?: LinkedNode<T>;
    next?: LinkedNode<T>;

    constructor(name: T) {
        this.value = name;
    }
}

export class LinkedList<T>{
    items: Array<LinkedNode<T>> = [];
    currentItem: LinkedNode<T>;

    constructor(items: Array<LinkedNode<T>>){
        this.items = items;
        if (this.items.length==0){
            throw Error("Linked List must have items")
        }
        this.currentItem = items[0];
    }
    
    next(count: number = 1): LinkedNode<T> {
        for (var _ = 0; _<count; _++) {
            if (this.currentItem && this.currentItem.next){
                this.currentItem = this.currentItem.next;
            }
        }
        return this.currentItem;
    }

    previous(count: number = 1): LinkedNode<T> {
        for (var _ = 0; _<count; _++) {
            if (this.currentItem && this.currentItem.previous){
                this.currentItem = this.currentItem.previous;
            }
        }
        return this.currentItem;
    }

    swapValues(from: LinkedNode<T>, to: LinkedNode<T>){
        var tempName = from.value;
        from.value = to.value;
        to.value = tempName;
    }
}

export namespace LinkedList{

    export const from = <T>(items: Array<T>, circle: boolean = false): LinkedList<T> => {
        var previous: LinkedNode<T>| undefined;
        const nodes: Array<LinkedNode<T>>= [];
        for (var item of items){
            var node = new LinkedNode(item);
            node.previous = previous;
            nodes.push(node)
            if (previous){
                previous.next = node;
            }
            previous = node;
        }
        if (circle){
            nodes.last()!.next = nodes.first();
            nodes.first()!.previous = nodes.last();
        }
        return new LinkedList(nodes);
    }
}