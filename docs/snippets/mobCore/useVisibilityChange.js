import { MobCore } from '../../../src/js/mobCore';

const unsubscribe = MobCore.useVisibilityChange(({ visibilityState }) => {
    // code
});

unsubscribe();
