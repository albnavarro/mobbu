import { mobCore } from '../../../mobCore/index.js';
import HandleTween from '../../animation/tween/handleTween.js';
import {
    easeTweenIsValid,
    valueIsBooleanAndReturnDefault,
    valueIsNumberAndReturnDefault,
} from '../../animation/utils/tweenAction/tweenValidation.js';
import { offset, isNode } from '../../../mobCore/utils/index.js';

/**
 * @description
 * Scroll body to values or element.
 */
export const bodyScroll = (() => {
    const defaultPreset = 'easeOutQuad';
    const tween = new HandleTween({ ease: defaultPreset, data: { val: 0 } });
    let isRunning = false;
    let overflow = false;
    let ease = defaultPreset;

    tween.subscribe(({ val }) => {
        window.scrollTo({
            top: val,
            left: 0,
            behavior: 'auto',
        });
    });

    /**
     * Restore settings
     */
    const onComplete = () => {
        if (overflow) document.body.style.overflow = '';
        if (ease) tween.updateEase(defaultPreset);
    };

    const stopTween = () => {
        if (!isRunning) return;

        tween.stop();
        onComplete();
    };

    /**
     * Stop scrolling on mouseWheel, MouseDown, TouchStart.
     */
    mobCore.useMouseWheel(() => {
        stopTween();
    });

    mobCore.useMouseDown(() => {
        stopTween();
    });

    mobCore.useTouchStart(() => {
        stopTween();
    });

    /**
     * @description
     *
     * @example
     *```javascript
       bodyScroll.to(0, {
           duration: 1000,
           overflow: true,
           ease: 'easeInExpo',
       });

       bodyScroll.to(myDomElement, {
           duration: 1000,
           overflow: true,
           ease: 'easeInExpo',
       });

     *```
     *
     * @param {(Number|Element)} target
     * @param {import('./type.js').bodyScrollType} data
     */
    const to = (target = null, data = {}) => {
        if (typeof window === 'undefined') return;

        const targetParsed = (() => {
            if (!target) return 0;

            const isValid = isNode(target) || mobCore.checkType(Number, target);

            if (!isValid) {
                console.warn(
                    `bodyScroll ${target} is not valid target, must be a node or a number`
                );
                return 0;
            }

            return isNode(target) ? offset(target).top : target;
        })();

        /**
         * Props
         */
        const duration = valueIsNumberAndReturnDefault(
            data?.duration,
            'bodyScroll: duration',
            500
        );

        overflow = valueIsBooleanAndReturnDefault(
            data?.overflow,
            'bodyScroll: overflow',
            false
        );

        ease = data?.ease ? easeTweenIsValid(data?.ease) : null;
        if (overflow) document.body.style.overflow = 'hidden';

        /**
         * Update easeType
         */
        if (ease) tween?.updateEase?.(ease);

        return new Promise((resolve, reject) => {
            isRunning = true;
            tween
                .goFromTo(
                    { val: window.scrollY },
                    { val: targetParsed },
                    { duration }
                )
                .then(() => {
                    onComplete();
                    isRunning = false;
                    resolve();
                })
                .catch(() => {
                    isRunning = false;
                    reject(mobCore.ANIMATION_STOP_REJECT);
                });
        });
    };

    return {
        to,
    };
})();
