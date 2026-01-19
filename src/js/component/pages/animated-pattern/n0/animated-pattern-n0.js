//@ts-check

/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiState
 * } from "@mobJsType"
 * @import {AnimatedPatternN0} from "./type"
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { animatedPatternN0Animation } from './animation/animation';
import { params } from './variations';
import { detectFirefox, detectSafari } from '@utils/utils';

/**
 * @param {object} params
 * @param {ProxiState<AnimatedPatternN0>} params.proxi
 * @param {GetRef<AnimatedPatternN0>} params.getRef
 * @returns {void}
 */
const createAnimation = ({ proxi, getRef }) => {
    proxi.destroy();

    proxi.destroy = animatedPatternN0Animation({
        canvas: getRef().canvas,
        ...params[proxi.currentParamsId].params,
        disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
    });
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiState<AnimatedPatternN0>} params.proxi
 * @param {GetRef<AnimatedPatternN0>} params.getRef
 * @param {BindEffect<AnimatedPatternN0>} params.bindEffect
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

/** @type {MobComponent<AnimatedPatternN0>} */
export const AnimatedPatternN0Fn = ({
    onMount,
    setRef,
    getRef,
    bindEffect,
    getProxi,
    delegateEvents,
}) => {
    const proxi = getProxi();

    onMount(() => {
        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                createAnimation({ proxi, getRef });
            });
        });

        const unsubscribeResize = MobCore.useResize(() => {
            createAnimation({ proxi, getRef });
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
            proxi.destroy();

            // @ts-ignore
            proxi.destroy = () => {};
            unsubscribeResize();
        };
    });

    return html`
        <div>
            <div class="c-canvas">
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
        </div>
    `;
};
