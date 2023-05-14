import { getLegendData } from '../../../../main';
import { createProps } from '../../../../mobjs';
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

export const CaterpillarN2 = ({ onMount, render, props }) => {
    const { buttons } = props;

    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        /**
         * Inizializa animation and get anima methods.
         */
        const animationMethods = caterpillarN2Animation({
            canvas,
            ...props,
        });

        /**
         * Get destroy methods.
         */
        const { destroy } = animationMethods;

        /**
         * Inizalize controls handler.
         */
        Object.entries(buttons).forEach(([className, value]) => {
            const { method } = value;
            const btn = element.querySelector(`.${className}`);
            btn.addEventListener('click', () => animationMethods?.[method]());
        });

        return () => {
            destroy();
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return render(/* HTML */ `
        <div>
            <CodeButton
                data-props="${createProps({
                    drawers: {
                        description: source.description,
                        js: source.js,
                        scss: source.scss,
                        component: source.component,
                    },
                    style: 'legend',
                })}"
            >
            </CodeButton>
            <div class="c-canvas">
                <ul class="c-canvas__controls">
                    ${getControls({ buttons })}
                </ul>
                <div class="c-canvas__wrap c-canvas__wrap">
                    <canvas></canvas>
                </div>
            </div>
        </div>
    `);
};
