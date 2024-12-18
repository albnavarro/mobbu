//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { CaterpillarN2 } from './type';
 **/

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { html } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import {
    resetAnimationTitle,
    updateAnimationTitle,
} from '../../../common/animationTitle/utils';
import {
    resetCodeButton,
    updateCodeButton,
} from '../../../common/codeButton/utils';
import {
    resetQuickNavState,
    updateQuickNavState,
} from '../../../common/quickNav/utils';
import {
    hideFooterShape,
    showFooterShape,
} from '../../../common/shapes/shapUtils';
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

/** @type {MobComponent<CaterpillarN2>} */
export const CaterpillarN2Fn = ({
    onMount,
    html,
    getState,
    setRef,
    getRef,
}) => {
    const { buttons, rotationDefault } = getState();
    document.body.style.background = '#000000';

    onMount(({ element }) => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        const { wrap, canvas, rangeValue, rotationButton } = getRef();

        /** Quicknav */
        updateQuickNavState({
            active: true,
            prevRoute: '#caterpillarN1',
            nextRoute: '#animatedPatternN0?version=0&activeId=0',
            color: 'white',
        });

        /** Title */
        updateAnimationTitle({
            align: 'left',
            title: 'Caterpillar N2',
            color: 'white',
        });

        // Footer shape
        hideFooterShape();

        /**
         * Code button
         */
        const { caterpillarN2 } = getLegendData();
        const { source } = caterpillarN2;
        updateCodeButton({
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
            color: 'white',
        });

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
            resetQuickNavState();
            resetAnimationTitle();
            resetCodeButton();
            document.body.style.background = '';
            destroy();
            showFooterShape();
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${setRef('wrap')}
                >
                    <ul class="c-canvas__controls">
                        ${getControls({ buttons })}
                        <li class="c-canvas__controls__item">
                            <label class="c-canvas__controls__label">
                                change rotation:
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
