import { getLegendData } from '../../../../data';
import { motionCore } from '../../../../mobMotion';
import { animatedPatternN1Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const AnimatedPatternN1 = ({ onMount, html, getState, staticProps }) => {
    onMount(({ refs }) => {
        if (motionCore.mq('max', 'desktop')) return;
        const { canvas } = refs;

        const destroyAnimation = animatedPatternN1Animation({
            canvas,
            ...getState(),
        });

        return () => {
            destroyAnimation();
        };
    });

    const { animatedPatternN1 } = getLegendData();
    const { source } = animatedPatternN1;

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
