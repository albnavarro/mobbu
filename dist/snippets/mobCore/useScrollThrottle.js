import { mobCore } from '../mobCore';

const unsubscribe = mobCore.useScrollThrottle(({ direction, scrollY }) => {
    // code
});

unsubscribe();
