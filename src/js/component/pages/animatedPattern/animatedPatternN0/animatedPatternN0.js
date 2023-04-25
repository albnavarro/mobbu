import { animatedPatternN0Animation } from './animation/animation';

export const AnimatedPatternN0 = ({ onMount, render, props }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = animatedPatternN0Animation({
            canvas,
            ...props,
        });

        return () => {
            destroyAnimation();
        };
    });

    return render(/* HTML */ `
        <div class="c-canvas">
            <div class="c-canvas__wrap">
                <canvas></canvas>
            </div>
        </div>
    `);
};
