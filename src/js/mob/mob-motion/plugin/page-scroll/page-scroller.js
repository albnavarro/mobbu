//@ts-check

import { MobMotionCore, MobTween } from '../..';
import { MobCore } from '../../../mob-core';

let isActive = false;

/** @type {number} */
let lastScrollValue = window.scrollY;

/** @type {boolean} */
let smoothIsActive = false;

/** @type {boolean} */
let isFreezed = false;

/** @type{() => void} */
let destroy = () => {};

/** @type{() => void} */
let stop = () => {};

/** @type{() => void} */
let update = () => {};

/** @type {HTMLElement | undefined} */
let rootElementToObserve;

/** @type {import('./type').MobPageScroller} */
const MobPageScroller = ({ velocity, rootElement }) => {
    let lerp = MobTween.createLerp({ data: { scrollValue: window.scrollY } });
    rootElementToObserve = rootElement;

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
    const unsubscribeMouseWheel = MobCore.useMouseWheel((event) => {
        if (isFreezed) return;

        event.preventDefault();
        smoothIsActive = true;
        const currentValue = MobMotionCore.clamp(
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
    const unsubscribeScroll = MobCore.useScroll(() => {
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
    const unsubscribeMouseDown = MobCore.useMouseDown((event) => {
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
        lerp.stop();
        lerp.setImmediate({ scrollValue: window.scrollY });
    });

    resizeObserver.observe(rootElement);

    return {
        destroy: () => {
            lastScrollValue = 0;
            smoothIsActive = false;
            isFreezed = true;

            // Disconnect resizeObserver.
            if (rootElementToObserve) {
                resizeObserver.unobserve(rootElementToObserve);
                resizeObserver.disconnect();
            }

            lerp?.stop();
            lerp?.destroy();

            // @ts-ignore
            lerp = null;

            // @ts-ignore
            rootElementToObserve = null;
            unsubscribe();
            unsubscribeScroll();
            unsubscribeMouseWheel();
            unsubscribeMouseDown();
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

/** @type{(arg0?: {velocity?: number, rootElement?: HTMLElement} ) => void} */
export const InitMobPageScroll = ({
    velocity = 100,
    rootElement = document.createElement('div'),
} = {}) => {
    if (isActive) return;

    lastScrollValue = window.scrollY;
    smoothIsActive = false;
    isFreezed = false;
    isActive = true;

    ({ destroy, stop, update } = MobPageScroller({
        velocity,
        rootElement,
    }));
};

/** @type{() => void} */
export const FreezeMobPageScroll = () => {
    if (!isActive || isFreezed) return;

    stop();
    smoothIsActive = false;
    isFreezed = true;
};

/** @type{() => void} */
export const UnFreezeMobPageScroll = () => {
    if (!isActive) return;

    isFreezed = false;
};

/** @type{() => void} */
export const UnFreezeAndUPdateMobPageScroll = () => {
    if (!isActive) return;

    update();
    lastScrollValue = window.scrollY;
    smoothIsActive = false;
    isFreezed = false;
};

/** @type{() => void} */
export const UpdateMobPageScroll = () => {
    if (!isActive) return;

    update();
};

/** @type{() => void} */
export const DestroyMobPageScroll = () => {
    destroy();
    isActive = false;
};
