import { core } from '../../../mobbu';

/**
 * Navigation store utils.
 */
export const navigationStore = core.createStore({
    // NOOP for emit cloaseAll accordion item event.
    closeAllItems: () => {},

    // NOOP for emit refresh scroller event.
    refreshScroller: () => {},
});
