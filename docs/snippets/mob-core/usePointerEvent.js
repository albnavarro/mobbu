import { MobCore } from '@mobCore';

const unsubscribe = MobCore.usePointerMove((event) => {
    console.log(event);
});

unsubscribe();
