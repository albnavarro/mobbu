import { MobCore } from '../mob/mobCore';
import { MobJs } from '../mob/mobjs';
import {
    FreezeMobPageScroll,
    InitMobPageScroll,
    UnFreezeAndUPdateMobPageScroll,
} from '../mob/mobMotion/plugin';

export const usePageScroll = () => {
    const rootElement = /** @type{HTMLElement} */ (
        document.querySelector('#root')
    );

    if (!rootElement) return;
    InitMobPageScroll({ rootElement });

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
