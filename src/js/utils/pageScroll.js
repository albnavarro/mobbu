import { mobCore } from '../mobCore';
import { mainStore } from '../mobjs';
import {
    initPageScroll,
    resumePageScroll,
    stopPageScroll,
} from '../mobMotion/plugin';

export const usePageScroll = () => {
    initPageScroll();

    mainStore.watch('beforeRouteChange', () => {
        stopPageScroll();
    });

    mainStore.watch('afterRouteChange', () => {
        /**
         * with 3 frame.
         * last animation frame will fired one frame after stop
         */
        mobCore.useFrameIndex(() => {
            resumePageScroll();
        }, 3);
    });
};
