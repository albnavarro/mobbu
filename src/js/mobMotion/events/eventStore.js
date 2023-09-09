import { mobCore } from '../../mobCore';

export const eventStore = mobCore.createStore({
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
    fpsScalePercent: { 0: 1, 30: 2, 50: 3 },
    useScaleFps: true,
    deferredNextTick: false,

    /**
     * Scroll
     */
    throttle: 60,
});
