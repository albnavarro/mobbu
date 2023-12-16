import { mobCore } from '../mobCore';

const unsubscribe = mobCore.useScrollImmediate(({ direction, scrollY }) => {
    // code
});

unsubscribe();
