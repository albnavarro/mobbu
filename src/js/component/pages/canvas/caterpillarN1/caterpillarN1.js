import { caterpillarN1Animation } from './animation/animation';

export const CaterpillarN1 = ({ onMount, render }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = caterpillarN1Animation({
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
