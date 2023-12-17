import { motionCore } from '../../../src/js/mobMotion';

motionCore.setDefault({
    lerp: {
        relative: false, // Default is false.
        velocity: 0.06, // Default is 0.06.
        precision: 0.01, // Default is 0.01.
    },
});
