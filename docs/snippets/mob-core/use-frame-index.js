import { MobCore } from '@mobCore';

// Execute callback after 5 frame.
MobCore.useFrameIndex(({ fps, shouldRender, time }) => {
    // code ...
}, 5);
