import { MobJs } from '@mobJs';
import {
    FreezeMobPageScroll,
    InitMobPageScroll,
    UnFreezeAndUPdateMobPageScroll,
} from '@mobMotionPlugin';
import {
    DestroyMobPageScroll,
    enebalePreventScroll,
    getActiveStateScroll,
} from '../mob/mob-motion/plugin/page-scroll/page-scroller';
import { MobCore } from '@mobCore';

let shouldFreezePageScroll = false;

const routeShoulNotUsePageScroll = new Set([
    'scrollerN0',
    'scrollerN1',
    'horizontalScroller',
]);

export const usePageScroll = () => {
    const rootElement = /** @type {HTMLElement} */ (
        document.querySelector('#root')
    );

    if (!rootElement) return;
    InitMobPageScroll({ rootElement });

    MobJs.mainStore.watch('beforeRouteChange', () => {
        FreezeMobPageScroll();
        enebalePreventScroll();
    });

    MobJs.mainStore.watch('afterRouteChange', () => {
        const currentRoute = MobJs.getActiveRoute()?.route;
        shouldFreezePageScroll = routeShoulNotUsePageScroll.has(currentRoute);

        /**
         * SnoothScroll freeze/unfeeze Page scroll. Use 10 frma delay to deactivate page-scroll in case is needed.
         */
        MobCore.useFrameIndex(() => {
            /**
             * Come from route without page-scroll active And current route should not use page-scroll.
             */
            if (shouldFreezePageScroll) {
                DestroyMobPageScroll();
                return;
            }

            const shouldInizialize = !getActiveStateScroll();

            /**
             * Come from route that use page-scroll and current route use too.
             */
            if (shouldInizialize) InitMobPageScroll({ rootElement });
            UnFreezeAndUPdateMobPageScroll();
        }, 30);
    });
};
