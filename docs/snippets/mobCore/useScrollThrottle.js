import { MobCore } from '@mobCore';

const unsubscribe = MobCore.useScrollThrottle(({ direction, scrollY }) => {
    // code
});

unsubscribe();
