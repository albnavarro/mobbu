//@ts-check

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState
 * } from "@mobJsType"
 * @import {ScrollerN1} from "./type"
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scroll-down-label/utils';
import { scrollerN1Animation } from './animation/animation';

/**
 * @param {object} params
 * @param {ProxiState<ScrollerN1>} params.proxi
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindObject} params.bindObject
 * @returns {string}
 */
function getControls({ proxi, delegateEvents, bindObject }) {
    const inputId = MobCore.getUnivoqueId();

    return html` <li class="c-canvas__controls__item">
        <div class="c-canvas__controls__range">
            <input
                type="range"
                min="360"
                max="2220"
                value="${proxi.rotation}"
                step="10"
                id=${inputId}
                ${delegateEvents({
                    'change:force': (/** @type {InputEvent} */ event) => {
                        const target = /** @type {HTMLInputElement} */ (
                            event.currentTarget
                        );

                        if (!target) return;
                        proxi.rotation = Number(target.value);
                    },
                    input: (/** @type {InputEvent} */ event) => {
                        const target = /** @type {HTMLInputElement} */ (
                            event.currentTarget
                        );

                        if (!target) return;

                        proxi.rotationlabel = Number(target.value);
                    },
                })}
            />
        </div>
        <label for=${inputId} class="c-canvas__controls__range-value">
            ${bindObject`rotationValue: ${() => proxi.rotationlabel}`}
        </label>
    </li>`;
}

/** @type {MobComponent<ScrollerN1>} */
export const ScrollerN1Fn = ({
    onMount,
    setRef,
    getRef,
    bindEffect,
    getProxi,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getProxi();

    onMount(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let destroy = () => {};

        /** Show scroll down label. */
        activateScrollDownArrow();

        /**
         * Refs
         */
        const { canvas, canvasScroller } = getRef();

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                destroy();

                destroy = scrollerN1Animation({
                    canvas,
                    canvasScroller,
                    ...proxi,
                    proxi,
                });
            });
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
            destroy();
            deactivateScrollDownArrow();

            // @ts-ignore
            destroy = null;
        };
    });

    /**
     * Desktop
     */
    return html`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div class="background-shape">${proxi.background}</div>
                <button
                    type="button"
                    class="c-canvas__controls__open"
                    ${delegateEvents({
                        click: () => {
                            proxi.controlsActive = true;
                        },
                    })}
                >
                    show controls
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
                        proxi,
                        delegateEvents,
                        bindObject,
                    })}
                </ul>
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
