import { getLegendData } from '../../../../data';
import { createProps } from '../../../../mobjs';
import { animatedPatternN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const AnimatedPatternN0 = ({ onMount, render, getState }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = animatedPatternN0Animation({
            canvas,
            ...getState(),
        });

        return () => {
            destroyAnimation();
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
                <div class="c-canvas__wrap">
                    <canvas></canvas>
                </div>
            </div>
        </div>
    `);
};
