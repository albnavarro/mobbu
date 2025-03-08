import { mobCore } from '../mobCore';
import { mainStore } from '../mobjs';
import {
    FreezeMobPageScroll,
    InitMobPageScroll,
    UnFreezeAndUPdateMobPageScroll,
} from '../mobMotion/plugin';

export const usePageScroll = () => {
    InitMobPageScroll({ rootElement: document.querySelector('#root') });

    mainStore.watch('beforeRouteChange', () => {
        FreezeMobPageScroll();
    });

    mainStore.watch('afterRouteChange', () => {
        /**
         * with 3 frame.
         * last animation frame will fired one frame after stop
         */
        mobCore.useFrameIndex(() => {
            UnFreezeAndUPdateMobPageScroll();
        }, 3);
    });
};
