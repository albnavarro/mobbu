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

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/nextPage/type').QuickNav>}
     */
    const setQuickNavState = setStateByName('quick_nav');

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/animationTitle/type').AnimationTitle>}
     */
    const setMainTitleState = setStateByName('animation_title');

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/codeButton/type').CodeButton>}
     */
    const setCodeButtonState = setStateByName('global-code-button');

    onMount(({ element, ref }) => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        const { wrap, canvas, rangeValue, rotationButton } = ref;

        /**
         * Quicknav
         */
        setQuickNavState('active', true);
        setQuickNavState('prevRoute', '#caterpillarN1');
        setQuickNavState(
            'nextRoute',
            '#animatedPatternN0?version=0&activeId=0'
        );
        setQuickNavState('color', 'black');

        /**
         * Title.
         */
        setMainTitleState('align', 'left');
        setMainTitleState('color', 'white');
        setMainTitleState('title', 'Caterpillar N2');

        /**
         * Code button
         */
        const { caterpillarN2 } = getLegendData();
        const { source } = caterpillarN2;
        setCodeButtonState('drawers', [
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
        setCodeButtonState('color', 'white');

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
            setQuickNavState('active', false);
            setQuickNavState('prevRoute', '');
            setQuickNavState('nextRoute', '');
            setMainTitleState('align', '');
            setMainTitleState('title', '');
            setCodeButtonState('drawers', []);
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
