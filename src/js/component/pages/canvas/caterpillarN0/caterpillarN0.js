import { caterpillarN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const CaterpillarN0 = ({ onMount, render, getState }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        /**
         * Observer test
         */
        element.dataset.test = 'test';
        element.dataset.test = 'test2';

        const destroyAnimation = caterpillarN0Animation({
            canvas,
            ...getState(),
        });

        return () => {
            destroyAnimation();
        };
    });

    return render(/* HTML */ `
        <caterpillar-n0 class="c-canvas">
            <div class="c-canvas__wrap c-canvas__wrap--border">
                <canvas></canvas>
            </div>
        </caterpillar-n0>
    `);
};
