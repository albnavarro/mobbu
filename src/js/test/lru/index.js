import { put, getMRU, get, getAll, getLRU, size } from './cache-lru';

export const LRUTest = () => {
    put('one', 1);
    put('two', 2);
    put('three', 3);
    put('four', 4);

    // extra, capacity is 4.
    put('five', 5);

    // MRU
    console.log('all:', getAll()); // [2, 3, 4, 5]
    console.log('get two:', get('two'));
    console.log('all:', getAll()); // [3, 4, 5, 2]
    console.log('size:', size()); // 4
    console.log('most recent used:', getMRU()); // two
    console.log('least recently used:', getLRU()); // three
    console.log('get three:', get('three'));
    console.log('all:', getAll()); // [3, 4, 5, 2]
    console.log('most recent used:', getMRU()); // two
    console.log('least recently used:', getLRU()); // three
};
