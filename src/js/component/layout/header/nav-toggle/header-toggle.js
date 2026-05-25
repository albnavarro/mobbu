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
    getSelfProxi,
    getBoundedProxi,
    onMount,
    addMethod,
}) => {
    const proxi = getSelfProxi();
    const boundedProxi = getBoundedProxi();

    onMount(({ element }) => {
        addMethod('setFocus', () => {
            element.focus({ preventScroll: true, focusVisible: true });
        });

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
                if (!boundedProxi.navigationIsOpen) {
                    UnFreezeMobPageScroll();
                }
            },
        }),
        bindEffect([
            {
                toggleClass: {
                    'is-open': () => boundedProxi.navigationIsOpen,
                    'is-mounted': () => proxi.isMounted,
                },
                toggleAttribute: {
                    'aria-label': () =>
                        boundedProxi.navigationIsOpen
                            ? 'chiudi menu'
                            : 'apri menu',
                    'aria-expanded': () =>
                        boundedProxi.navigationIsOpen ? 'true' : 'false',
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
