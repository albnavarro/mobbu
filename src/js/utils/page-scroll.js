import { navigationStore } from '@layoutComponent/navigation/store/nav-store';
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
let shouldDestroyPageScroll = false;
const routeShoulNotUsePageScroll = new Set(['scrollerN0', 'scrollerN1']);

export const usePageScroll = () => {
    const rootElement = /** @type {HTMLElement} */ (
        document.querySelector('#root')
    );

    const init = () => {
        InitMobPageScroll({ rootElement });
        shouldInit = false;
        usePrevent = true;
    };

    const destroy = () => {
        DestroyMobPageScroll();
        shouldInit = true;
        usePrevent = false;
    };

    if (!rootElement) return;
    InitMobPageScroll({ rootElement });
    shouldInit = false;

    navigationStore.watch('navigationIsOpen', (isOpen) => {
        if (isOpen) {
            destroy();
            return;
        }

        if (shouldInit && !shouldDestroyPageScroll) {
            init();
        }
    });

    MobJs.mainStore.watch('routeIsLoading', (isLoading) => {
        if (isLoading) {
            usePrevent = true;
            FreezeMobPageScroll();
            return;
        }

        const currentRoute = MobJs.getActiveRoute()?.route;
        shouldDestroyPageScroll = routeShoulNotUsePageScroll.has(currentRoute);

        /**
         * Come from route without page-scroll active And current route should not use page-scroll.
         */
        if (shouldInit && !shouldDestroyPageScroll) {
            init();
            return;
        }

        /**
         * This rout should not use page-scroll.
         */
        if (shouldDestroyPageScroll) {
            destroy();
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
