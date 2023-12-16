import { mobCore } from '../mobCore';

const unsubscribe = mobCore.useResize(
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
