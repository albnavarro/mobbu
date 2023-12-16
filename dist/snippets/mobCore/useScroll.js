import { mobCore } from '../mobCore';

const unsubscribe = mobCore.useScroll(({ direction, scrollY }) => {
    // code
});

unsubscribe();
