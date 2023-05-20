import { scrollerN0Animation } from './animation/animation';

export const ScrollerN0 = ({ onMount, render, props }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = scrollerN0Animation({
            canvas,
            ...props,
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
