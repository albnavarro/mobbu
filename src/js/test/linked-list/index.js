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
    console.log(list.first?.data);

    console.log('--- next head ----');
    console.log(list.first?.next?.data);

    console.log('--- head next next ----');
    console.log(list.first?.next?.next?.data);

    console.log('--- head next next prev ----');
    console.log(list.first?.next?.next?.prev?.data);

    console.log('tail');
    console.log(list.last?.data);

    console.log('size');
    console.log(list.size);

    const node10 = list.find((node) => node.data === 10);
    console.log('find node 10', node10);
    list.print();

    console.log('insert 11 after 10');
    if (node10) list.insertAfter(node10, 11);
    list.print();

    console.log('insert 9 before 10');
    if (node10) list.insertBefore(node10, 9);
    list.print();

    console.log('move 20 after 5');
    const node20 = list.find((node) => node.data === 20);
    const node5 = list.find((node) => node.data === 5);
    if (node20 && node5) list.moveAfter(node20, node5).print();
    console.log('head after move:', list.first?.data);
    console.log('tail after move:', list.last?.data);

    console.log('move 5 before 30');
    const node30 = list.find((node) => node.data === 30);
    if (node30 && node5) list.moveBefore(node5, node30).print();
    console.log('head after move:', list.first?.data);
    console.log('tail after move:', list.last?.data);

    console.log('move 30 after 9');
    const node9 = list.find((node) => node.data === 9);
    if (node30 && node9) list.moveAfter(node30, node9).print();
    console.log('head after move:', list.first?.data);
    console.log('tail after move:', list.last?.data);

    console.log('swap 30 & 9');
    const nodeA = list.find((node) => node.data === 30);
    const nodeB = list.find((node) => node.data === 9);
    if (nodeA && nodeB) list.swap(nodeA, nodeB).print();
    console.log('head after swap:', list.first?.data);
    console.log('tail after swap:', list.last?.data);

    console.log('remove 10');
    if (node10) list.removeNode(node10);

    list.print();

    console.log('Map list:');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const listMapped = list
        .map((node, index) => ({ prop: node.data, index }))
        .traverse((node) => {
            console.log(node.data);
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
