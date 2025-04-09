import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import {
    FreezeMobPageScroll,
    InitMobPageScroll,
    UnFreezeAndUPdateMobPageScroll,
} from '@mobMotionPlugin';

export const usePageScroll = () => {
    const rootElement = /** @type {HTMLElement} */ (
        document.querySelector('#root')
    );

    if (!rootElement) return;
    InitMobPageScroll({ rootElement });

    MobJs.mainStore.watch('beforeRouteChange', () => {
        FreezeMobPageScroll();
    });

    MobJs.mainStore.watch('afterRouteChange', () => {
        /**
         * With 3 frame. last animation frame will fired one frame after stop
         */
        MobCore.useFrameIndex(() => {
            UnFreezeAndUPdateMobPageScroll();
        }, 3);
    });
};
