//@ts-check

import { mobCore } from '../../../mobCore';
import { motionCore } from '../../core';
import { tween } from '../../tween';

let isActive = false;

/** @type{number} */
let lastScrollValue = window.scrollY;

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
const PageScroller = ({ velocity, rootElement }) => {
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
     * Update lerp value on change screen dimension
     */
    const resizeObserver = new ResizeObserver(() => {
        lerp.setImmediate({ scrollValue: window.scrollY });
    });

    resizeObserver.observe(rootElement);

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
            resizeObserver.unobserve(document.querySelector('#root'));
            resizeObserver.disconnect();
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
            lerp.stop();
        },
        update: () => {
            lerp.setImmediate({ scrollValue: window.scrollY });
        },
    };
};

/** @type{(arg0?: {velocity?: number, rootElement?: HTMLElement}) => void} */
export const initPageScroll = ({
    velocity = 100,
    rootElement = document.createElement('div'),
} = {}) => {
    if (isActive) return;

    lastScrollValue = window.scrollY;
    smoothIsActive = false;
    isFreezed = false;
    isActive = true;

    ({ freeze, unFreeze, destroy, stop, update } = PageScroller({
        velocity,
        rootElement,
    }));
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

/** @type{() => void} */
export const stopPageScroll = () => {
    lastScrollValue = 0;
    smoothIsActive = false;
    isFreezed = true;

    stop();
};

/** @type{() => void} */
export const resumePageScroll = () => {
    lastScrollValue = window.scrollY;
    smoothIsActive = false;
    isFreezed = false;

    update();
};

/** @type{() => void} */
export const updatePageScroll = () => {
    update();
};