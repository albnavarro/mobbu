//@ts-check

import { mobCore } from '../../../mobCore/index.js';
import { outerHeight } from '../../../mobCore/utils/index.js';
import HandleTween from '../../animation/tween/handleTween.js';

/** @type {import('./type.js').Slide[]} */
let slideItems = [];

/**
 * @type {(target: HTMLElement) => boolean}
 */
const isNode = (target) => {
    const isValid = mobCore.checkType(Element, target);

    if (!isValid)
        console.warn(`slide utils ${target} is not a valid Dom element`);

    return isValid;
};

/**
 * @description
 * Subscribe element to internal store.
 *
 * @param {HTMLElement} target
 * @param {string} slideId
 * @returns {import('./type.js').Slide} Unsubscribe function.
 */
const setSlideData = (target, slideId) => {
    const tween = new HandleTween({ ease: 'easeOutQuad', data: { val: 0 } });

    return {
        item: target,
        id: slideId,
        tween,
        unsubscribe: tween.subscribe(({ val }) => {
            target.style.height = `${val}px`;
        }),
    };
};

/**
 * @description
 * Slide up-down utils.
 * It is essentially a small store where you can subscribe to dom elements and manage them.
 *
 * @example
 *
 * ```javascript
 * Subscribe target in store:
 * const unsubscribe = slide.subscribe(target);
 *
 * Reset target:
 * slide.reset(target);
 *
 * Slide up-down:
 * slide.up(target).then(() => { ... });
 * slide.down(target).then(() => { ... });
 *
 * Remove item from store:
 * unsubscribe();
 * ```
 */
export const slide = (() => {
    /**
     * @description
     * Subscribe element to internal store.
     *
     * @param {HTMLElement} target - Dom node.
     * @returns {() => void} Unsubscribe function.
     */
    const subscribe = (target) => {
        if (!isNode(target)) return () => {};

        /**
         * Check if target is already subscribed to slide utils
         */
        const alreadySubscribe = slideItems.find(({ item }) => item === target);
        if (alreadySubscribe) {
            console.warn(`slide utils ${target} is alredysubscribed`);
            return () => {};
        }

        /**
         * Update items Array
         */
        const id = mobCore.getUnivoqueId();
        const data = setSlideData(target, id);
        slideItems.push(data);

        /**
         * Return unsubscribe
         */
        return () => {
            data.unsubscribe();
            const { tween } = data;
            tween.destroy();
            slideItems = slideItems.filter(
                ({ id: currentId }) => currentId !== id
            );
        };
    };

    /**
     * @description
     * Reset target height ( 0px ) .
     * Set `overflow: hidden` to target.
     *
     * @param {HTMLElement} target - Dom node.
     */
    const reset = (target) => {
        if (!isNode(target)) return;

        target.style.height = '0';
        target.style.overflow = 'hidden';
    };

    /**
     * @description
     * Slide up target.
     * Return a promise.
     *
     * @example
     * ```javascript
     * slide.up(myELement)
     *      .then(() => { ... })
     *      .catch(() => { ... })
     * ```
     *
     * @param {Element} target - Dom node.
     * @returns {Promise} Promise fired on animation ends.
     */
    const up = (target) => {
        return new Promise((resolve) => {
            // @ts-ignore
            if (!isNode(target)) {
                resolve(true);
                return;
            }

            // Reject of target not exist in store
            const currentItem = slideItems.find(({ item }) => item === target);
            if (!currentItem) {
                console.warn('slide element not exist in slide store');
                resolve(true);
            }

            // height of item may be change once opened outside tween control
            // use fromTo in this case
            // @ts-ignore
            const { item, tween } = currentItem;
            const currentHeight = outerHeight(item);

            tween
                .goFromTo({ val: currentHeight }, { val: 0 }, { duration: 500 })
                .then(() => {
                    resolve(true);
                });
        });
    };

    /**
     * @description
     * Slide down target.
     * Return a promise.
     *
     * @example
     * ```javascript
     * slide.down(myELement)
     *      .then(() => { ... })
     *      .catch(() => { ... })
     * ```
     *
     * @param {HTMLElement} target - Dom node.
     * @returns {Promise} Promise fired on animation ends.
     */
    const down = (target) => {
        return new Promise((resolve) => {
            if (!isNode(target)) {
                resolve(true);
                return;
            }

            // Reject of target not exist in store
            const currentItem = slideItems.find(({ item }) => item === target);
            if (!currentItem) {
                console.warn('slide element not exist in slide store');
                resolve(true);
            }

            // @ts-ignore
            const { item, tween } = currentItem;
            const { val: currentHeight } = tween.get();
            item.style.height = `auto`;
            const height = outerHeight(item);
            item.style.height = `${currentHeight}px`;

            tween.goTo({ val: height }, { duration: 500 }).then(() => {
                item.style.height = `auto`;
                resolve(true);
            });
        });
    };

    return { subscribe, reset, up, down };
})();
