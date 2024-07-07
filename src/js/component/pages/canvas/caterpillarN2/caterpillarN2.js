//@ts-check

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { html, setStateByName } from '../../../../mobjs';
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
 * @type {import('../../../../mobjs/type').mobComponent<import('./type').CaterpillarN2>}
 */
export const CaterpillarN2Fn = ({ onMount, html, getState }) => {
    const { buttons, rotationDefault } = getState();
    document.body.style.background = '#000000';

    onMount(({ element, ref }) => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        const { wrap, canvas, rangeValue, rotationButton } = ref;

        /**
         * Quicknav
         */
        setStateByName('quick_nav', 'active', true);
        setStateByName('quick_nav', 'prevRoute', '#caterpillarN1');
        setStateByName(
            'quick_nav',
            'nextRoute',
            '#animatedPatternN0?version=0&activeId=0'
        );
        setStateByName('quick_nav', 'color', 'black');

        /**
         * Title.
         */
        setStateByName('animation_title', 'align', 'left');
        setStateByName('animation_title', 'color', 'white');
        setStateByName('animation_title', 'title', 'Caterpillar N2');

        /**
         * Code button
         */
        const { caterpillarN2 } = getLegendData();
        const { source } = caterpillarN2;
        setStateByName('global-code-button', 'drawers', [
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
        setStateByName('global-code-button', 'color', 'white');

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
            btn?.addEventListener('click', () => animationMethods?.[method]());
        });

        /**
         * Rotation handler
         */
        rotationButton.addEventListener('change', () => {
            // @ts-ignore
            const value = rotationButton.value;
            setRotation(value);
            rangeValue.textContent = value;
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            setStateByName('quick_nav', 'active', false);
            setStateByName('quick_nav', 'prevRoute', '');
            setStateByName('quick_nav', 'nextRoute', '');
            setStateByName('animation_title', 'align', '');
            setStateByName('animation_title', 'title', '');
            setStateByName('global-code-button', 'drawers', []);
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
