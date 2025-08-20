import { MobCore } from '@mobCore';

// Execute callback after 5 frame.
MobCore.useFrameIndex(({ fps, time }) => {
    // code ...
}, 5);
