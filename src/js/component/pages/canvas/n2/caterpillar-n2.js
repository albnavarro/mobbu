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

            return html` <li class="c-canvas__controls__item">
                <button
                    type="button"
                    class="c-canvas__controls__btn ${className}"
                >
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
                <div class="background-shape background-shape--light">
                    ${proxi.background}
                </div>
                <div
                    class="c-canvas__wrap"
                    ${bindEffect({
                        toggleClass: { active: () => proxi.isMounted },
                    })}
                >
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
                        ${getControls({ buttons: proxi.buttons })}
                        <li class="c-canvas__controls__item">
                            <div class="c-canvas__controls__range">
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
                                            const target =
                                                /** @type {HTMLInputElement} */ (
                                                    event.target
                                                );

                                            if (!target) return;
                                            proxi.rotation = Number(
                                                target.value
                                            );
                                        },
                                        input: (
                                            /** @type {InputEvent} */ event
                                        ) => {
                                            const target =
                                                /** @type {HTMLInputElement} */ (
                                                    event.target
                                                );

                                            if (!target) return;

                                            proxi.rotationlabel = Number(
                                                target.value
                                            );
                                        },
                                    })}
                                />
                            </div>
                            <label
                                for=${inputId}
                                class="c-canvas__controls__range-value"
                            >
                                ${bindObject`deg: ${() => proxi.rotationlabel}`}
                            </label>
                        </li>
                    </ul>
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
