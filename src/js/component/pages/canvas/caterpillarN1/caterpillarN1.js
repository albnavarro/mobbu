import { caterpillarN1Animation } from './animation/animation';

export const CaterpillarN1 = ({ onMount, render, props }) => {
    onMount(({ element }) => {
        const { width, height, color, borderColor, opacity, radius } = props;
        const canvas = element.querySelector('canvas');

        const destroyAnimation = caterpillarN1Animation({
            canvas,
            numItems: 20,
            width,
            height,
            color,
            borderColor,
            opacity,
            radius,
        });

        return () => {
            destroyAnimation();
        };
    });

    return render(/* HTML */ `
        <div class="caterpillar-canvas">
            <div class="caterpillar-canvas__wrap">
                <canvas></canvas>
            </div>
        </div>
    `);
};
