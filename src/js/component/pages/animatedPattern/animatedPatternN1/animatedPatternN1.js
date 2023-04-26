import { createProps } from '../../../../baseComponent/mainStore/actions/props';
import { getLegendData } from '../../../../route';
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

    const { animatedPatternN1 } = getLegendData();
    const { title, description, type, source } = animatedPatternN1;

    return render(/* HTML */ `
        <div>
            <legend
                data-props="${createProps({
                    title,
                    description,
                    type,
                    source,
                })}"
            ></legend>
            <div class="c-canvas">
                <div class="c-canvas__wrap">
                    <canvas></canvas>
                </div>
            </div>
        </div>
    `);
};
