import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { getIdByInstanceName, html, setStateById } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
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
export const CaterpillarN2Fn = ({ onMount, html, getState }) => {
    const { buttons, rotationDefault } = getState();
    document.body.style.background = '#000000';

    onMount(({ element, refs }) => {
        if (motionCore.mq('max', 'desktop')) return;
        const { wrap, canvas, rangeValue, rotationButton } = refs;

        /**
         * Quicknav
         */
        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'prevRoute', '#caterpillarN1');
        setStateById(
            quicknavId,
            'nextRoute',
            '#animatedPatternN0?version=0&activeId=0'
        );
        setStateById(quicknavId, 'color', 'black');

        /**
         * Title.
         */
        const titleId = getIdByInstanceName('animation_title');
        setStateById(titleId, 'align', 'left');
        setStateById(titleId, 'color', 'white');
        setStateById(titleId, 'title', 'Caterpillar N2');

        /**
         * Code button
         */
        const { caterpillarN2 } = getLegendData();
        const { source } = caterpillarN2;
        const codeButtonId = getIdByInstanceName('global-code-button');
        setStateById(codeButtonId, 'drawers', [
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
        ]);
        setStateById(codeButtonId, 'color', 'white');

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
            setStateById(titleId, 'align', '');
            setStateById(titleId, 'title', '');
            setStateById(codeButtonId, 'drawers', []);
            document.body.style.background = '';
            destroy();
        };
    });

    return html`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas">
                <div class="c-canvas__wrap c-canvas__wrap--wrapped" ref="wrap">
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
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `;
};
