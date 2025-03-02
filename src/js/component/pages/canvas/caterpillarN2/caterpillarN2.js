//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { CaterpillarN2, CaterpillarN2Button } from './type';
 **/

import { mobCore } from '../../../../mobCore';
import { html } from '../../../../mobjs';
import { canvasBackground } from '../../../../utils/canvasUtils';
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
    html,
    getState,
    setState,
    setRef,
    getRef,
    bindEffect,
}) => {
    const { buttons, rotationDefault } = getState();
    document.body.style.background = canvasBackground;

    onMount(({ element }) => {
        const { canvas, rangeValue, rotationButton } = getRef();

        /**
         * Inizializa animation and get anima methods.
         */
        const animationMethods = caterpillarN2Animation({
            canvas,
            ...getState(),
        });

        /**
         * Get destroy methods.
         */
        const { destroy, setRotation } = animationMethods;

        /**
         * Inizalize controls handler.
         */
        Object.entries(buttons).forEach(([className, value]) => {
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

        mobCore.useFrame(() => {
            setState('isMounted', true);
        });

        return () => {
            document.body.style.background = '';
            destroy();
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${bindEffect({
                        bind: 'isMounted',
                        toggleClass: { active: () => getState().isMounted },
                    })}
                >
                    <ul class="c-canvas__controls">
                        ${getControls({ buttons })}
                        <li class="c-canvas__controls__item is-like-button">
                            <label class="c-canvas__controls__label">
                                deg:
                                <span
                                    class="js-range-value"
                                    ${setRef('rangeValue')}
                                    >${rotationDefault}</span
                                >
                            </label>
                            <div class="c-canvas__controls__range">
                                <input
                                    type="range"
                                    min="0"
                                    max="720"
                                    value="${rotationDefault}"
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
