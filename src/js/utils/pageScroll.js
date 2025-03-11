import { MobCore } from '../mobCore';
import { MobJs } from '../mobjs';
import {
    FreezeMobPageScroll,
    InitMobPageScroll,
    UnFreezeAndUPdateMobPageScroll,
} from '../mobMotion/plugin';

export const usePageScroll = () => {
    InitMobPageScroll({ rootElement: document.querySelector('#root') });

    MobJs.mainStore.watch('beforeRouteChange', () => {
        FreezeMobPageScroll();
    });

    MobJs.mainStore.watch('afterRouteChange', () => {
        /**
         * with 3 frame.
         * last animation frame will fired one frame after stop
         */
        MobCore.useFrameIndex(() => {
            UnFreezeAndUPdateMobPageScroll();
        }, 3);
    });
};
