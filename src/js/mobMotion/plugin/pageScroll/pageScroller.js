//@ts-check

import { mobCore } from '../../../mobCore';
import { motionCore } from '../../core';
import { tween } from '../../tween';

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

/** @type{() => void} */
let stop = () => {};

/** @type{() => void} */
let update = () => {};

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
            lastScrollValue = 0;
            smoothIsActive = false;
            isFreezed = true;
            lerp?.stop();
            lerp?.destroy();
            // @ts-ignore
            lerp = null;
            unsubscribe();
            unsubscribeScroll();
            unsubscribeMouseWheel();
            unsubscribeMouseDown();
            freeze = () => {};
            unFreeze = () => {};
            destroy = () => {};
            stop = () => {};
            update = () => {};
        },
        stop: () => {
            lastScrollValue = 0;
            lerp.stop();
            smoothIsActive = false;
        },
        update: () => {
            lerp.setImmediate({ scrollValue: window.scrollY });
        },
    };
};

/** @type{(arg0?: {velocity?: number}) => void} */
export const initPageScroll = ({ velocity = 60 } = {}) => {
    if (isActive) return;

    ({ freeze, unFreeze, destroy, stop, update } = PageScroller({ velocity }));
    isActive = true;
    isFreezed = false;
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

export const stopPageScroll = () => {
    stop();
};

export const updatePageScroll = () => {
    update();
};
