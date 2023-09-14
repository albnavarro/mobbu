import { getLegendData } from '../../../../data';
import { caterpillarN2Animation } from './animation/animation';

function getControls({ buttons }) {
    return Object.entries(buttons)
        .map(([className, value]) => {
            const { label } = value;

            return /* HTML */ ` <li class="c-canvas__controls__item">
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

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const CaterpillarN2 = ({ onMount, render, getState, staticProps }) => {
    const { buttons, rotationDefault } = getState();

    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');
        const rangeValue = element.querySelector('.js-range-value');
        const rotationButton = element.querySelector(
            '.c-canvas__controls__range input'
        );

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
            btn.addEventListener('click', () => animationMethods?.[method]());
        });

        /**
         * Rotation handler
         */
        rotationButton.addEventListener('change', () => {
            const value = rotationButton.value;
            setRotation(value);
            rangeValue.textContent = value;
        });

        return () => {
            destroy();
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return render(/* HTML */ `
        <caterpillar-n2>
            <code-button
                ${staticProps({
                    drawers: [
                        {
                            label: 'description',
                            source: source.description,
                        },
                        {
                            label: 'definition',
                            source: source.definition,
                        },
                        {
                            label: 'component',
                            source: source.component,
                        },
                        {
                            label: 'animation',
                            source: source.animation,
                        },
                    ],
                    style: 'legend',
                })}
            >
            </code-button>
            <div class="c-canvas">
                <ul class="c-canvas__controls">
                    ${getControls({ buttons })}
                    <li class="c-canvas__controls__item">
                        <label class="c-canvas__controls__label">
                            change rotation:
                            <span class="js-range-value"
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
                            />
                        </div>
                    </li>
                </ul>
                <div class="c-canvas__wrap c-canvas__wrap">
                    <canvas></canvas>
                </div>
            </div>
        </caterpillar-n2>
    `);
};
