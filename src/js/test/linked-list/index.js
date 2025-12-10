import { LinkedList } from './linked-list';

export const likendListTest = () => {
    /** @type {LinkedList<number>} */
    const list = new LinkedList();

    console.log('-- Add element ---');
    list.add(10);
    list.add(20);
    list.add(30);
    list.addFirst(5);
    list.print();

    console.log('--- insert 15 in position 2 ---');
    list.insertAt(15, 2);
    list.print();

    console.log('--- Remove element 15 ----');
    list.remove(15);
    list.print();

    console.log('--- Search 20 ---');
    console.log('index of 20', list.indexOf(20));

    console.log('--- Get at index 2 ---');
    console.log('value at 2', list.get(2));

    console.log('--- traversing ---');
    list.traverse((data) => console.log('Elemento:', data));

    console.log('--- inversion ----');
    list.reverse();
    list.print();

    console.log('--- Array conversion ----');
    console.log(list.toArray());

    console.log('--- current haed ----');
    console.log(list.head);

    console.log('--- next head ----');
    console.log(list.head?.next);

    console.log('--- head next next ----');
    console.log(list.head?.next?.next);

    console.log('--- head next next prev ----');
    console.log(list.head?.next?.next?.prev);

    console.log('tail');
    console.log(list.tail);

    console.log('size');
    console.log(list.size);
};
