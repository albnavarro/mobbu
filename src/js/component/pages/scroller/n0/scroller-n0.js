//@ts-check

/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState
 * } from "@mobJsType"
 * @import {ScrollerN0} from "./type"
 */

import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scroll-down-label/utils';
import { scrollerN0Animation } from './animation/animation';
import { params } from './variations';

/**
 * Component is a singleton
 */
let unsubscribeEscHandler = () => {};

/**
 * @param {object} params
 * @param {ProxiSelfState<ScrollerN0>} params.proxi
 * @param {GetRef<ScrollerN0>} params.getRef
 * @param {boolean} [params.resetScroll]
 * @returns {void}
 */
const createAnimation = ({ proxi, getRef, resetScroll = true }) => {
    /**
     * Prevent landing at bottom of the page.
     */
    if (resetScroll) window.scrollTo(0, 0);
    proxi.destroy();

    proxi.destroy = scrollerN0Animation({
        canvas: getRef().canvas,
        canvasScroller: getRef().canvasScroller,
        ...params[proxi.currentParamsId].params,
        // disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
        disableOffcanvas: true,
    });
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiSelfState<ScrollerN0>} params.proxi
 * @param {GetRef<ScrollerN0>} params.getRef
 * @param {BindEffect<ScrollerN0>} params.bindEffect
 * @returns {HTMLElement[]}
 */
function getControls({ delegateEvents, bindEffect, proxi, getRef }) {
    return params.map(({ label }, index) => {
        return htmlObject({
            tag: 'li',
            className: 'controls-item',
            content: {
                tag: 'button',
                className: 'controls-button',
                modules: [
                    delegateEvents({
                        click: () => {
                            proxi.currentParamsId = index;
                            createAnimation({ proxi, getRef });
                        },
                    }),
                    bindEffect({
                        toggleClass: {
                            active: () => proxi.currentParamsId === index,
                        },
                    }),
                ],
                content: label,
            },
        });
    });
}

/** @type {MobComponent<ScrollerN0>} */
export const ScrollerN0Fn = ({
    onMount,
    setRef,
    getRef,
    bindEffect,
    getSelfProxi,
    delegateEvents,
    watch,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        /** Show scroll down label. */
        activateScrollDownArrow();

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                createAnimation({ proxi, getRef });
            });
        });

        const unsubscribeResize = MobCore.useResize(() => {
            createAnimation({ proxi, getRef, resetScroll: false });
        });

        MobCore.useFrame(() => {
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        });

        watch(
            () => proxi.controlsActive,
            (isActive) => {
                if (isActive) {
                    unsubscribeEscHandler = MobCore.useEscHandler(
                        ({ preventDefault }) => {
                            proxi.controlsActive = false;
                            preventDefault();
                        }
                    );
                    return;
                }

                unsubscribeEscHandler();
            }
        );

        return () => {
            proxi.destroy();
            // @ts-ignore
            proxi.destroy = () => {};
            deactivateScrollDownArrow();
            unsubscribeResize();
            unsubscribeEscHandler();
        };
    });

    return htmlObject({
        content: [
            {
                className: 'c-canvas is-fixed',
                content: [
                    {
                        className: 'l-background-shape',
                        content: proxi.background,
                    },
                    {
                        tag: 'button',
                        className: 'controls-open',
                        attributes: { type: 'button' },
                        modules: [
                            delegateEvents({
                                click: () => {
                                    proxi.controlsActive = true;
                                },
                            }),
                            bindEffect({
                                toggleAttribute: {
                                    tabindex: () =>
                                        proxi.controlsActive ? '-1' : '0',
                                },
                            }),
                        ],
                        content: 'variations',
                    },
                    {
                        tag: 'ul',
                        className: 'controls',
                        modules: bindEffect({
                            toggleClass: {
                                active: () => proxi.controlsActive,
                            },
                            toggleAttribute: {
                                inert: () => !proxi.controlsActive,
                            },
                        }),
                        content: [
                            {
                                tag: 'button',
                                className: 'controls-close',
                                attributes: { type: 'button' },
                                modules: delegateEvents({
                                    click: () => {
                                        proxi.controlsActive = false;
                                    },
                                }),
                            },
                            ...getControls({
                                delegateEvents,
                                bindEffect,
                                proxi,
                                getRef,
                            }),
                        ],
                    },
                    {
                        className: 'canvas-container',
                        modules: bindEffect({
                            toggleClass: { active: () => proxi.isMounted },
                        }),
                        content: {
                            tag: 'canvas',
                            modules: setRef('canvas'),
                        },
                    },
                ],
            },
            {
                className: 'c-canvas-scroller',
                modules: setRef('canvasScroller'),
            },
        ],
    });
};
