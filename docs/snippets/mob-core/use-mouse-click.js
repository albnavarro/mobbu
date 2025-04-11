import { MobCore } from '@mobCore';

const unsubscribe = MobCore.useMouseClick(
    ({ client, page, preventDefault, target, type }) => {
        // code
    }
);
unsubscribe();

///

const unsubscribe = MobCore.useMouseDown(
    ({ client, page, preventDefault, target, type }) => {
        // code
    }
);
unsubscribe();

// ...
