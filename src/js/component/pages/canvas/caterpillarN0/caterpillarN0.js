import { caterpillarN0Animation } from './animation/animation';

export const CaterpillarN0 = ({ onMount, render, getState }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = caterpillarN0Animation({
            canvas,
            ...getState(),
        });

        return () => {
            destroyAnimation();
        };
    });

    return render(/* HTML */ `
        <div class="c-canvas">
            <div class="c-canvas__wrap c-canvas__wrap--border">
                <canvas></canvas>
            </div>
        </div>
    `);
};
