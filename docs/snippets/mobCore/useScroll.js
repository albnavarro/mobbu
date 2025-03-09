import { MobCore } from '../../../src/js/mobCore';

const unsubscribe = MobCore.useScroll(({ direction, scrollY }) => {
    // code
});

unsubscribe();
