import { mobCore } from '../mobCore';

// Execute callback after 5 frame.
mobCore.useFrameIndex(({ fps, shouldRender, time }) => {
    // code ...
}, 5);
