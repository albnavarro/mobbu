import { MobCore } from '../../../src/js/mobCore';

const unsubscribe = MobCore.useScrollStart(({ scrollY }) => {
    // code
});

unsubscribe();

const unsubscribe = MobCore.useScrollEnd(({ scrollY }) => {
    // code
});

unsubscribe();
