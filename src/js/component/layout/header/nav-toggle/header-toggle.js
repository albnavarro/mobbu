/**
 * @import {MobComponent} from "@mobJsType"
 */

import { getFrameDelay } from '@componentLibs/utils/get-first-animation-delay';
import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
import { UnFreezeMobPageScroll } from '@mobMotionPlugin';
import { navigationStore } from '@stores/navigation';

/** @type {MobComponent<import('./type').HeaderToggle>} */
export const HeaderToggleFn = ({
    delegateEvents,
    bindEffect,
    getProxi,
    onMount,
}) => {
    const proxi = getProxi();

    onMount(() => {
        MobCore.useFrameIndex(() => {
            proxi.isMounted = true;
        }, getFrameDelay());
    });

    const modules = [
        delegateEvents({
            click: () => {
                navigationStore.update('navigationIsOpen', (state) => !state);

                /**
                 * Secure check. Mouse loave on SmoothScroll trigger Unfrezze too.
                 */
                if (!proxi.navigationIsOpen) {
                    UnFreezeMobPageScroll();
                }
            },
        }),
        bindEffect([
            {
                toggleClass: {
                    'is-open': () => proxi.navigationIsOpen,
                },
            },
            {
                toggleClass: {
                    'is-mounted': () => proxi.isMounted,
                },
            },
        ]),
    ];

    return htmlObject({
        tag: 'button',
        className: 'c-hamburger',
        attributes: { type: 'button' },
        modules,
        content: {
            className: 'wrapper',
            content: {
                className: 'lines',
            },
        },
    });
};
