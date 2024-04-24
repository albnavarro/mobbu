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
    deferredNextTick: true,

    /**
     * Scroll
     */
    throttle: 60,
});
