//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {
 *   CaterpillarN2,
 *   CaterpillarN2Button
 * } from "./type"
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { caterpillarN2Animation } from './animation/animation';

/**
 * @param {object} params
 * @param {CaterpillarN2Button} params.buttons
 * @returns {string}
 */
function getControls({ buttons }) {
    return Object.entries(buttons)
        .map(([className, value]) => {
            const { label } = value;

            return html` <li class="controls-item">
                <button type="button" class="controls-button ${className}">
                    ${label}
                </button>
            </li>`;
        })
        .join('');
}

/** @type {MobComponent<CaterpillarN2>} */
export const CaterpillarN2Fn = ({
    onMount,
    setRef,
    getRef,
    bindEffect,
    getProxi,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getProxi();
    const inputId = MobCore.getUnivoqueId();

    onMount(({ element }) => {
        const { canvas } = getRef();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        let destroy = () => {};

        /**
         * Inizializa animation and get anima methods.
         */
        const animationMethods = caterpillarN2Animation({
            canvas,
            proxi,
        });

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                ({ destroy } = animationMethods);
            });
        });

        /**
         * Inizalize controls handler.
         */
        Object.entries(proxi.buttons).forEach(([className, value]) => {
            const { method } = value;
            const btn = element.querySelector(`.${className}`);
            // @ts-ignore
            btn?.addEventListener('click', () => animationMethods?.[method]());
        });

        MobCore.useFrame(() => {
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        });

        return () => {
            destroy();

            // @ts-ignore
            destroy = null;
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <button
                    type="button"
                    class="controls-open"
                    ${delegateEvents({
                        click: () => {
                            proxi.controlsActive = true;
                        },
                    })}
                >
                    show controls
                </button>
                <ul
                    class="controls"
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.controlsActive,
                        },
                    })}
                >
                    <button
                        type="button"
                        class="controls-close"
                        ${delegateEvents({
                            click: () => {
                                proxi.controlsActive = false;
                            },
                        })}
                    ></button>
                    ${getControls({ buttons: proxi.buttons })}
                    <li class="controls-item">
                        <div class="controls-range">
                            <input
                                type="range"
                                min="0"
                                max="720"
                                value="${proxi.rotation}"
                                step="1"
                                id=${inputId}
                                ${delegateEvents({
                                    'change:force': (
                                        /** @type {InputEvent} */ event
                                    ) => {
                                        const currentTarget =
                                            /** @type {HTMLInputElement} */ (
                                                event.currentTarget
                                            );

                                        if (!currentTarget) return;
                                        proxi.rotation = Number(
                                            currentTarget.value
                                        );
                                    },
                                    input: (
                                        /** @type {InputEvent} */ event
                                    ) => {
                                        const currentTarget =
                                            /** @type {HTMLInputElement} */ (
                                                event.currentTarget
                                            );

                                        if (!currentTarget) return;

                                        proxi.rotationlabel = Number(
                                            currentTarget.value
                                        );
                                    },
                                })}
                            />
                        </div>
                        <label for=${inputId} class="controls-range-value">
                            ${bindObject`deg: ${() => proxi.rotationlabel}`}
                        </label>
                    </li>
                </ul>

                <div class="l-background-shape is-light">
                    ${proxi.background}
                </div>
                <div
                    class="canvas-container"
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
