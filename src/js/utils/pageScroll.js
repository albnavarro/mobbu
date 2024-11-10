import { mobCore } from '../mobCore';
import { mainStore } from '../mobjs';
import {
    freezePageScroll,
    initPageScroll,
    unFreezeAndUPdatePageScroll,
} from '../mobMotion/plugin';

export const usePageScroll = () => {
    initPageScroll({ rootElement: document.querySelector('#root') });

    mainStore.watch('beforeRouteChange', () => {
        freezePageScroll();
    });

    mainStore.watch('afterRouteChange', () => {
        /**
         * with 3 frame.
         * last animation frame will fired one frame after stop
         */
        mobCore.useFrameIndex(() => {
            unFreezeAndUPdatePageScroll();
        }, 3);
    });
};
