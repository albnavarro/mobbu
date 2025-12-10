import { LinkedList } from './linked-list';

export const likendListTest = () => {
    const list = new LinkedList();

    console.log('=== Aggiunta elementi ===');
    list.add(10);
    list.add(20);
    list.add(30);
    list.addFirst(5);
    list.print(); // 5 -> 10 -> 20 -> 30

    console.log('\n=== Inserimento in posizione ===');
    list.insertAt(15, 2);
    list.print(); // 5 -> 10 -> 15 -> 20 -> 30

    console.log('\n=== Rimozione elementi ===');
    list.remove(15);
    list.print(); // 5 -> 10 -> 20 -> 30

    console.log('\n=== Ricerca ===');
    console.log('Indice di 20:', list.indexOf(20)); // 2

    console.log('\n=== Get at index ===');
    console.log("valore all' indice 2:", list.get(2)); // 20

    console.log('\n=== Attraversamento ===');
    list.traverse((data) => console.log('Elemento:', data));

    console.log('\n=== Dimensione ===');
    console.log('Dimensione lista:', list.getSize()); // 4

    console.log('\n=== Inversione ===');
    list.reverse();
    list.print(); // 30 -> 20 -> 10 -> 5

    console.log('\n=== Conversione in array ===');
    console.log(list.toArray()); // [30, 20, 10, 5]

    console.log('\n=== Current head ===');
    console.log(list.head); // 30

    console.log('\n=== head next ===');
    console.log(list.head?.next); // 20

    console.log('\n=== head next next ===');
    console.log(list.head?.next?.next); // 10

    console.log('\n=== head next next prev ===');
    console.log(list.head?.next?.next?.prev); // 20

    console.log('\n=== Current tail ===');
    console.log(list.tail); // 5

    console.log('\n=== Size ===');
    console.log(list.size); // 4
};
