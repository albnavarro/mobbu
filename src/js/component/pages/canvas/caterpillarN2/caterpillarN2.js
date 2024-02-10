import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { getIdByInstanceName, html, setStateById } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { detectSafari } from '../../../../utils/utils';
import { caterpillarN2Animation } from './animation/animation';

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

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const CaterpillarN2 = ({ onMount, html, getState, staticProps }) => {
    const { buttons, rotationDefault } = getState();

    onMount(({ element, refs }) => {
        if (motionCore.mq('max', 'desktop')) return;
        const { wrap, canvas, rangeValue, rotationButton } = refs;

        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'prevRoute', '#caterpillarN1');
        setStateById(
            quicknavId,
            'nextRoute',
            '#animatedPatternN0?version=0&activeId=0'
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

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            setStateById(quicknavId, 'active', false);
            setStateById(quicknavId, 'prevRoute', '');
            setStateById(quicknavId, 'nextRoute', '');
            destroy();
        };
    });

    const { caterpillarN2 } = getLegendData();
    const { source } = caterpillarN2;

    const canvasStyle = detectSafari() ? 'c-canvas__wrap--wrapped' : '';

    return html`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas">
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
                <ul class="c-canvas__controls">
                    ${getControls({ buttons })}
                    <li class="c-canvas__controls__item">
                        <label class="c-canvas__controls__label">
                            change rotation:
                            <span class="js-range-value" ref="rangeValue"
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
                                ref="rotationButton"
                            />
                        </div>
                    </li>
                </ul>
                <div class="c-canvas__wrap ${canvasStyle}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `;
};
