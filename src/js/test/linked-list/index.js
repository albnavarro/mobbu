import { LinkedList } from './linked-list';

export const linkedListTest = () => {
    /** @type {LinkedList<number>} */
    const list = new LinkedList();

    console.log('-- Add element ---');
    list.addLast(10)
        .addLast(20)
        .addLast(30)
        .execute(() => console.log('add 10, 20, 30'))
        .print()
        .addFirst(5)
        .execute(() => console.log('add 5 head'))
        .print()
        // eslint-disable-next-line unicorn/no-array-reverse
        .reverse()
        .execute(() => console.log('reverse'))
        .print();

    console.log('--- Array conversion ----');
    console.log(list.toArray());

    console.log('--- current head ----');
    console.log(list.first);

    console.log('--- next head ----');
    console.log(list.first?.next);

    console.log('--- head next next ----');
    console.log(list.first?.next?.next);

    console.log('--- head next next prev ----');
    console.log(list.first?.next?.next?.prev);

    console.log('tail');
    console.log(list.last);

    console.log('size');
    console.log(list.size);

    const node10 = list.find((node) => node.data === 10);
    console.log('find node 10', node10);

    console.log('insert 11 after 10');
    if (node10) list.insertAfter(node10, 11);

    console.log('insert 9 before 10');
    if (node10) list.insertBefore(node10, 9);

    console.log('remove 10');
    if (node10) list.removeNode(node10);

    console.log('Map list:');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const listMapped = list
        .map((node, index) => ({ prop: node.data, index }))
        .print()
        .traverse((node) => {
            console.log(node);
        });

    console.log('Filter list:');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filteredlist = list
        .filter((node) => node.data === 10 || node.data === 5)
        .print()
        .traverse((node) => {
            console.log(node);
        });

    for (const node of listMapped) {
        console.log('iterator node:', node);
    }

    console.log('clear');
    list.clear().print();
};
