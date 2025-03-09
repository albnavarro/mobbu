import { MobCore } from '../../../src/js/mobCore';

const unsubscribe = MobCore.useScrollThrottle(({ direction, scrollY }) => {
    // code
});

unsubscribe();
