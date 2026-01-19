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
import { html } from '@mobJs';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scroll-down-label/utils';
import { scrollerN0Animation } from './animation/animation';
import { params } from './variations';
import { detectFirefox, detectSafari } from '@utils/utils';

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
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    });
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiState<ScrollerN0>} params.proxi
 * @param {GetRef<ScrollerN0>} params.getRef
 * @param {BindEffect<ScrollerN0>} params.bindEffect
 * @returns {string}
 */
function getControls({ delegateEvents, bindEffect, proxi, getRef }) {
    return params
        .map(({ label }, index) => {
            return html` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn"
                    ${delegateEvents({
                        click: () => {
                            proxi.currentParamsId = index;
                            createAnimation({ proxi, getRef });
                        },
                    })}
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.currentParamsId === index,
                        },
                    })}
                >
                    ${label}
                </button>
            </li>`;
        })
        .join('');
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

    /**
     * Desktop
     */
    return html`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${delegateEvents({
                        click: () => {
                            proxi.controlsActive = true;
                        },
                    })}
                >
                    variations
                </button>
                <ul
                    class="c-canvas__controls"
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.controlsActive,
                        },
                    })}
                >
                    <button
                        type="button"
                        class="c-canvas__controls__close"
                        ${delegateEvents({
                            click: () => {
                                proxi.controlsActive = false;
                            },
                        })}
                    ></button>
                    ${getControls({
                        delegateEvents,
                        bindEffect,
                        proxi,
                        getRef,
                    })}
                </ul>
                <div class="background-shape">${proxi.background}</div>
                <div
                    class="c-canvas__wrap"
                    ${bindEffect({
                        toggleClass: { active: () => proxi.isMounted },
                    })}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${setRef('canvasScroller')}></div>
        </div>
    `;
};
