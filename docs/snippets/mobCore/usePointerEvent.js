import { mobCore } from '../../../src/js/mobCore';

const unsubscribe = mobCore.usePointerMove((event) => {
    console.log(event);
});

unsubscribe();
