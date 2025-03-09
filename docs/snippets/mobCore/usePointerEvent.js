import { MobCore } from '../../../src/js/mobCore';

const unsubscribe = MobCore.usePointerMove((event) => {
    console.log(event);
});

unsubscribe();
