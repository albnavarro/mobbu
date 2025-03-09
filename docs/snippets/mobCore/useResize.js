import { MobCore } from '../../../src/js/mobCore';

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
