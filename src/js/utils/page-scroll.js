import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import {
    DestroyMobPageScroll,
    FreezeMobPageScroll,
    InitMobPageScroll,
    UnFreezeAndUPdateMobPageScroll,
} from '@mobMotionPlugin';

let usePrevent = false;
let shouldInit = false;
const routeShoulNotUsePageScroll = new Set(['scrollerN0', 'scrollerN1']);

export const usePageScroll = () => {
    const rootElement = /** @type {HTMLElement} */ (
        document.querySelector('#root')
    );

    if (!rootElement) return;
    InitMobPageScroll({ rootElement });
    shouldInit = false;

    MobJs.mainStore.watch('routeIsLoading', (isLoading) => {
        if (isLoading) {
            usePrevent = true;
            FreezeMobPageScroll();
            return;
        }

        const currentRoute = MobJs.getActiveRoute()?.route;
        const shouldDestroyPageScroll =
            routeShoulNotUsePageScroll.has(currentRoute);

        /**
         * Come from route without page-scroll active And current route should not use page-scroll.
         */
        if (shouldInit && !shouldDestroyPageScroll) {
            InitMobPageScroll({ rootElement });
            shouldInit = false;
            usePrevent = true;
            return;
        }

        /**
         * This rout should not use page-scroll.
         */
        if (shouldDestroyPageScroll) {
            DestroyMobPageScroll();
            shouldInit = true;
            usePrevent = false;
            return;
        }

        /**
         * Come from route that use page-scroll and current route use too.
         */
        UnFreezeAndUPdateMobPageScroll();
        usePrevent = true;
    });

    MobCore.useMouseWheel(({ preventDefault }) => {
        if (usePrevent) preventDefault();
    });
};
