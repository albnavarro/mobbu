import { getLegendData } from '../../../../data';
import { caterpillarN1Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const CaterpillarN1 = ({ onMount, render, getState, staticProps }) => {
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
                ${staticProps({
                    drawers: [
                        {
                            label: 'description',
                            source: source.description,
                        },
                        {
                            label: 'animation',
                            source: source.js,
                        },
                        {
                            label: 'component',
                            source: source.component,
                        },
                    ],
                    style: 'legend',
                })}
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
