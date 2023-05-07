import { createProps } from '../../../../baseComponent/mainStore/actions/props';
import { getLegendData } from '../../../../baseComponent/route';
import { animatedPatternN1Animation } from './animation/animation';

export const AnimatedPatternN1 = ({ onMount, render, props }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = animatedPatternN1Animation({
            canvas,
            ...props,
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
                    description: source.description,
                    js: source.js,
                    scss: source.scss,
                    html: source.html,
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
