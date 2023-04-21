import { caterpillarCanvasAnimation } from './animation/animation';

export const CaterpillarCanvas = ({ onMount, render }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = caterpillarCanvasAnimation({
            canvas,
            numItems: 20,
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
