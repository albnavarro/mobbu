import { getLegendData } from '../../../../data';
import { detectSafari } from '../../../../utils/utils';
import { caterpillarN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const CaterpillarN0 = ({ onMount, html, getState, staticProps }) => {
    onMount(({ element, refs }) => {
        const { canvas } = refs;

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

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    const canvasStyle = detectSafari() ? 'c-canvas__wrap--wrapped' : '';

    return html`
        <div>
            <code-button
                ${staticProps({
                    drawers: [
                        {
                            label: 'description',
                            source: source.description,
                        },
                        {
                            label: 'definition',
                            source: source.definition,
                        },
                        {
                            label: 'component',
                            source: source.component,
                        },
                        {
                            label: 'animation',
                            source: source.animation,
                        },
                    ],
                    style: 'legend',
                })}
            >
            </code-button>
            <div class="c-canvas">
                <div class="c-canvas__wrap ${canvasStyle}">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `;
};
