import { MobCore } from '@mobCore';
import { MobJs } from '@mobJs';
import {
    FreezeMobPageScroll,
    InitMobPageScroll,
    UnFreezeAndUPdateMobPageScroll,
} from '@mobMotionPlugin';

let usePrevent = false;

export const usePageScroll = () => {
    const rootElement = /** @type {HTMLElement} */ (
        document.querySelector('#root')
    );

    if (!rootElement) return;
    InitMobPageScroll({ rootElement });

    MobJs.mainStore.watch('routeIsLoading', (isLoading) => {
        if (isLoading) {
            usePrevent = true;
            FreezeMobPageScroll();
            return;
        }

        MobCore.useFrameIndex(() => {
            UnFreezeAndUPdateMobPageScroll();
            usePrevent = true;
        }, 3);
    });

    MobCore.useMouseWheel(({ preventDefault }) => {
        if (usePrevent) preventDefault();
    });
};
