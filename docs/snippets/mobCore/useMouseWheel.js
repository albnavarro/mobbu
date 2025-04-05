import { MobCore } from '@mobCore';

const unsubscribe = MobCore.useMouseWheel(
    ({
        client,
        page,
        preventDefault,
        target,
        type,
        pixelX,
        pixelY,
        spinX,
        spinY,
    }) => {
        // code
    }
);

unsubscribe();
