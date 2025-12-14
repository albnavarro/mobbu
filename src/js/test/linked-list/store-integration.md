```js
import { MobCore } from '@mobCore';
import { LinkedList } from './linked-list';

export const linkedListTest = () => {
    const store = MobCore.createStore({
        likedList: () => ({
            value: new LinkedList(),
            type: 'any',
            skipEqual: false,
        }),
        listParsed: () => ({
            value: /** @type {number[]} */ ([]),
            type: Array,
            skipEqual: false,
        }),
    });

    const proxi = store.getProxi();

    store.computed(
        () => proxi.listParsed,
        () => proxi.likedList.toArray()
    );

    store.watch(
        () => proxi.listParsed,
        (value) => {
            console.log(value);
        }
    );

    proxi.likedList = proxi.likedList.addLast(10);
    proxi.likedList = proxi.likedList.addLast(20);
    proxi.likedList = proxi.likedList.addLast(30);
    proxi.likedList = proxi.likedList.addLast(40);
    const nodeA = proxi.likedList.find((node) => node.data === 20);
    const nodeB = proxi.likedList.find((node) => node.data === 30);
    if (!nodeA || !nodeB) return;

    proxi.likedList = proxi.likedList.swap(nodeB, nodeA);
    proxi.likedList = proxi.likedList.insertAfter(nodeB, 35);
    console.log(nodeB.next?.data);
};
```
