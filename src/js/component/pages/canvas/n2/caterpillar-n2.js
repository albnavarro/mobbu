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
    getState,
    setRef,
    getRef,
    bindEffect,
    getProxi,
    delegateEvents,
}) => {
    const proxi = getProxi();

    onMount(({ element }) => {
        const { canvas, rangeValue, rotationButton } = getRef();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        let destroy = () => {};

        // eslint-disable-next-line @typescript-eslint/no-unused-vars,unicorn/consistent-function-scoping
        let setRotation = (/** @type {number} */ _value) => {};

        /**
         * Inizializa animation and get anima methods.
         */
        const animationMethods = caterpillarN2Animation({
            canvas,
            ...getState(),
        });

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                ({ destroy, setRotation } = animationMethods);
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

        /**
         * Rotation handler
         */
        rotationButton.addEventListener('change', () => {
            const value = rotationButton.value;
            setRotation(Number(value));
            rangeValue.textContent = value;
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
            destroy();

            // @ts-ignore
            destroy = null;

            // @ts-ignore
            setRotation = null;
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
                        <li class="c-canvas__controls__item is-like-button">
                            <label class="c-canvas__controls__label">
                                deg:
                                <span
                                    class="js-range-value"
                                    ${setRef('rangeValue')}
                                    >${proxi.rotationDefault}</span
                                >
                            </label>
                            <div class="c-canvas__controls__range">
                                <input
                                    type="range"
                                    min="0"
                                    max="720"
                                    value="${proxi.rotationDefault}"
                                    step="1"
                                    ${setRef('rotationButton')}
                                />
                            </div>
                        </li>
                    </ul>
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
