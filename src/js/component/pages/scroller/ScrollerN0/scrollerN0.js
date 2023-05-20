import { getLegendData } from '../../../../main';
import { createProps } from '../../../../mobjs';
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

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return render(/* HTML */ `
        <div class="c-canvas">
            <CodeButton
                data-props="${createProps({
                    drawers: {
                        description: source.description,
                        js: source.js,
                        scss: source.scss,
                        component: source.component,
                    },
                    style: 'legend',
                })}"
            >
            </CodeButton>
            <div class="c-canvas__wrap c-canvas__wrap--border">
                <canvas></canvas>
            </div>
        </div>
    `);
};
