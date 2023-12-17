import { motionCore } from '../../../src/js/mobMotion';

motionCore.setDefault({
    /**
     * Default is true
     */
    useScaleFps: true,

    /**
     * Default:
     * {0: 1, 30: 2, 50: 3}
     */
    fpsScalePercent: { 0: 1, 30: 5, 50: 10 },
});
