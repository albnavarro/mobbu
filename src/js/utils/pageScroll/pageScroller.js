//@ts-check

import { mobCore } from '../../mobCore';
import { mainStore } from '../../mobjs';
import { motionCore, tween } from '../../mobMotion';

let isActive = false;

/** @type{number} */
let lastScrollValue = 0;

/** @type{boolean} */
let smoothIsActive = false;

/** @type{boolean} */
let isFreezed = false;

/** @type{() => void} */
let freeze = () => {};

/** @type{() => void} */
let unFreeze = () => {};

/** @type{() => void} */
let destroy = () => {};

/** @type{import('./type').PageScroller} */
const PageScroller = ({ velocity }) => {
    let lerp = tween.createLerp({ data: { scrollValue: window.scrollY } });

    const unsubscribe = lerp.subscribe(({ scrollValue }) => {
        if (isFreezed) return;

        window.scrollTo({
            top: scrollValue,
            left: 0,
            behavior: 'auto',
        });
    });

    lerp.onComplete(() => {
        smoothIsActive = false;
    });

    /**
     * Main handler.
     */
    const unsubscribeMouseWheel = mobCore.useMouseWheel((event) => {
        if (isFreezed) return;

        event.preventDefault();
        smoothIsActive = true;
        const currentValue = motionCore.clamp(
            // @ts-ignore
            event.spinY * velocity + lastScrollValue,
            0,
            document.body.offsetHeight - window.innerHeight
        );

        lastScrollValue = currentValue;
        lerp.goTo({ scrollValue: currentValue });
    });

    /**
     * Update lerp value on native scroll event.
     */
    const unsubscribeScroll = mobCore.useScroll(() => {
        if (smoothIsActive || isFreezed) {
            return;
        }

        const value = window.scrollY;
        lastScrollValue = value;
        lerp.setImmediate({ scrollValue: value });
    });

    /**
     * Stop lerp if use native scrollbar
     */
    const unsubscribeMouseDown = mobCore.useMouseDown((event) => {
        if (isFreezed) return;

        const scrollBarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        if (event.page.x > window.innerWidth - scrollBarWidth) {
            lerp.stop();
            smoothIsActive = false;
        }
    });

    /**
     * Stop lerp on route change.
     */
    const unwatchBeforeRouteLeave = mainStore.watch('beforeRouteLeave', () => {
        lastScrollValue = 0;
        lerp.stop();
        smoothIsActive = false;
    });

    /**
     * Update lerp value after route change.
     */
    const unwatchAfterRoutechange = mainStore.watch('afterRouteChange', () => {
        lerp.setImmediate({ scrollValue: window.scrollY });
    });

    return {
        freeze: () => {
            lerp.stop();
            smoothIsActive = false;
            isFreezed = true;
        },
        unFreeze: () => {
            isFreezed = false;
        },
        destroy: () => {
            lerp?.destroy();
            // @ts-ignore
            lerp = null;
            unsubscribe();
            unwatchAfterRoutechange();
            unwatchBeforeRouteLeave();
            unsubscribeScroll();
            unsubscribeMouseWheel();
            unsubscribeMouseDown();
            freeze = () => {};
            unFreeze = () => {};
            destroy = () => {};
        },
    };
};

/** @type{(arg0?: {velocity?: number}) => void} */
export const initPageScroll = ({ velocity = 60 } = {}) => {
    if (isActive) return;

    ({ freeze, unFreeze, destroy } = PageScroller({ velocity }));
    isActive = true;
};

/** @type{() => void} */
export const freezePageScroll = () => {
    freeze();
};

/** @type{() => void} */
export const unFreezePageScroll = () => {
    unFreeze();
};

/** @type{() => void} */
export const destroyPageScroll = () => {
    destroy();
    isActive = false;
};
