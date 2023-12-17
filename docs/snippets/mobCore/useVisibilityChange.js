import { mobCore } from '../mobCore';

const unsubscribe = mobCore.useVisibilityChange(({ visibilityState }) => {
    // code
});

unsubscribe();
