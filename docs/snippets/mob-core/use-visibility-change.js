import { MobCore } from '@mobCore';

const unsubscribe = MobCore.useVisibilityChange(({ visibilityState }) => {
    // code
});

unsubscribe();
