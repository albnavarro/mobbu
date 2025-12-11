import { LinkedList } from './linked-list';

export const likendListTest = () => {
    /** @type {LinkedList<number>} */
    const list = new LinkedList();

    console.log('-- Add element ---');
    list.add(10)
        .add(20)
        .add(30)
        .execute(() => console.log('add 10, 20, 30'))
        .print()
        .addFirst(5)
        .execute(() => console.log('add 5 first'))
        .print()
        .insertAt(15, 2)
        .execute(() => console.log('insert 15 at 2'))
        .print()
        .remove(15)
        .execute(() => console.log('remove 15'))
        .print();

    console.log('Search 20');
    console.log('index of 20', list.indexOf(20));

    console.log('Get at index 2');
    console.log('value at 2', list.get(2));

    list.print()
        .traverse((data) => console.log('Elemento:', data))
        // eslint-disable-next-line unicorn/no-array-reverse
        .reverse()
        .execute(() => console.log('reverse'))
        .print();

    console.log('--- Array conversion ----');
    console.log(list.toArray());

    console.log('--- current head ----');
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
