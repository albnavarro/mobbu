//@ts-check

/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState
 * } from '@mobJsType'
 * @import {ScrollerN0} from './type'
 */

import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scroll-down-label/utils';
import { scrollerN0Animation } from './animation/animation';
import { params } from './variations';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { DetailOffcanvas } from '@commonComponent/detail-off-canvas/definition';

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
export const ScrollerN0Function = ({
    onMount,
    setRef,
    getRef,
    bindEffect,
    getSelfProxi,
    delegateEvents,
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

        return () => {
            proxi.destroy();
            // @ts-ignore
            proxi.destroy = () => {};
            deactivateScrollDownArrow();
            unsubscribeResize();
        };
    });

    return htmlObject({
        content: [
            {
                className: 'c-canvas is-fixed',
                content: [
                    {
                        component: H1Standalone,
                        modules: MobJs.staticProps(
                            /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                                text: 'Canvas: Scroller N0',
                            })
                        ),
                    },
                    {
                        className: 'l-background-shape',
                        content: proxi.background,
                    },
                    {
                        component: DetailOffcanvas,
                        content: getControls({
                            delegateEvents,
                            bindEffect,
                            proxi,
                            getRef,
                        }),
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
