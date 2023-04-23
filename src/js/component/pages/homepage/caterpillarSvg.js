import { mushroomAnimation } from './animation/mushroomAnimation';

export const CaterpillarSvg = ({ onMount, render, props }) => {
    const {} = props;

    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = mushroomAnimation({
            canvas,
        });

        return () => {
            destroyAnimation();
        };
    });

    return render(/* HTML */ `
        <div class="mushroom">
            <div class="mushroom__wrap">
                <canvas></canvas>
            </div>
        </div>
    `);
};
