import { getLegendData } from '../../../../data';
import { core } from '../../../../mobMotion';
import { detectSafari } from '../../../../utils/utils';
import { caterpillarN1Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const CaterpillarN1 = ({ onMount, html, getState, staticProps }) => {
    onMount(({ refs }) => {
        if (core.mq('max', 'desktop')) return;

        const { canvas } = refs;

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

    const canvasStyle = detectSafari() ? 'c-canvas__wrap--wrapped' : '';

    return html`
        <div>
            <only-desktop></only-desktop>
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
