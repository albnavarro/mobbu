//@ts-check

/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiState
 * } from "@mobJsType"
 * @import {ScrollerN0} from "./type"
 */

import { MobCore } from '@mobCore';
import { fromObject } from '@mobJs';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scroll-down-label/utils';
import { scrollerN0Animation } from './animation/animation';
import { params } from './variations';

/**
 * @param {object} params
 * @param {ProxiState<ScrollerN0>} params.proxi
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
 * @param {ProxiState<ScrollerN0>} params.proxi
 * @param {GetRef<ScrollerN0>} params.getRef
 * @param {BindEffect<ScrollerN0>} params.bindEffect
 * @returns {string[]}
 */
function getControls({ delegateEvents, bindEffect, proxi, getRef }) {
    return params.map(({ label }, index) => {
        return fromObject({
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
    getProxi,
    delegateEvents,
}) => {
    const proxi = getProxi();

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

        return () => {
            proxi.destroy();
            // @ts-ignore
            proxi.destroy = () => {};

            deactivateScrollDownArrow();
            unsubscribeResize();
        };
    });

    return fromObject({
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
                        modules: delegateEvents({
                            click: () => {
                                proxi.controlsActive = true;
                            },
                        }),
                        content: 'variations',
                    },
                    {
                        tag: 'ul',
                        className: 'controls',
                        modules: bindEffect({
                            toggleClass: {
                                active: () => proxi.controlsActive,
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
