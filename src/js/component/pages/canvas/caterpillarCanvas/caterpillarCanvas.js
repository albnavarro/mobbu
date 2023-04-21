import { caterpillarCanvasAnimation } from './animation/animation';

export const CaterpillarCanvas = ({ onMount, render }) => {
    onMount(({ element }) => {
        console.log(element);
        const canvas = element.querySelector('canvas');

        const destroyAnimation = caterpillarCanvasAnimation({ canvas });

        return () => {
            destroyAnimation();
        };
    });

    return render(/* HTML */ `
        <div class="caterpillar-canvas">
            <canvas></canvas>
        </div>
    `);
};
