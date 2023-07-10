import { getLegendData } from '../../../../main';
import { createProps } from '../../../../mobjs';
import { caterpillarN1Animation } from './animation/animation';

export const CaterpillarN1 = ({ onMount, render, getState }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');

        const destroyAnimation = caterpillarN1Animation({
            canvas,
            ...getState(),
        });

        return () => {
            destroyAnimation();
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return render(/* HTML */ `
        <div>
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
            <div class="c-canvas">
                <div class="c-canvas__wrap c-canvas__wrap--border">
                    <canvas></canvas>
                </div>
            </div>
        </div>
    `);
};
