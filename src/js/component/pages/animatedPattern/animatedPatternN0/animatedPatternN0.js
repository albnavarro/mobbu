import { getLegendData } from '../../../../data';
import { core } from '../../../../mobMotion';
import { animatedPatternN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const AnimatedPatternN0 = ({ onMount, html, getState, staticProps }) => {
    onMount(({ refs }) => {
        if (core.mq('max', 'desktop')) return;
        const { canvas } = refs;

        const destroyAnimation = animatedPatternN0Animation({
            canvas,
            ...getState(),
        });

        return () => {
            destroyAnimation();
        };
    });

    const { animatedPatternN0 } = getLegendData();
    const { source } = animatedPatternN0;

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
                <div class="c-canvas__wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
        </div>
    `;
};
