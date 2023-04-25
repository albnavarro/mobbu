import { caterpillarN0Animation } from './animation/animation';

export const CaterpillarN0 = ({ onMount, render, props }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');
        const wrap = element.querySelector('.c-canvas__wrap');

        const destroyAnimation = caterpillarN0Animation({
            canvas,
            wrap,
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
