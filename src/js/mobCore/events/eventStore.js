// import { SimpleStore } from '../store/classVersion/simpleStore';
import { mobStore } from '../store/mobStore.js';

export const eventStore = mobStore({
    /**
     * Mouse event
     */
    usePassive: true,

    /**
     * Frame Event
     */
    currentFrame: 0,
    instantFps: 60,
    requestFrame: () => {},
    fpsScalePercent: () => ({
        value: { 0: 1, 30: 2, 50: 3 },
        type: 'Any',
    }),
    useScaleFps: true,
    deferredNextTick: true,

    /**
     * Scroll
     */
    throttle: 60,
});
