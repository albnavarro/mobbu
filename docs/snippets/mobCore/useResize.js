import { MobCore } from '@mobCore';

const unsubscribe = MobCore.useResize(
    ({
        documentHeight,
        horizontalResize,
        scrollY,
        verticalResize,
        windowsHeight,
        windowsWidth,
    }) => {
        // code
    }
);

unsubscribe();
