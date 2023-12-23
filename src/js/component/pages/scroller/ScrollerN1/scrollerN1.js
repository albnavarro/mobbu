import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { motionCore } from '../../../../mobMotion';
import { detectSafari } from '../../../../utils/utils';
import { scrollerN1Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const ScrollerN1 = ({ onMount, html, getState, staticProps }) => {
    onMount(({ refs }) => {
        if (motionCore.mq('max', 'desktop')) return;

        const { wrap, canvas, canvasScroller } = refs;

        const destroyAnimation = scrollerN1Animation({
            canvas,
            canvasScroller,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            destroyAnimation();
        };
    });

    const { scrollerN1 } = getLegendData();
    const { source } = scrollerN1;

    const canvasStyle = detectSafari() ? 'c-canvas__wrap--wrapped' : '';

    /**
     * Skip mobile.
     */
    if (motionCore.mq('max', 'desktop'))
        return html`<div><only-desktop></only-desktop></div>`;

    /**
     * Desktop
     */
    return html`
        <div>
            <only-desktop></only-desktop>
            <div class="c-canvas c-canvas--fixed ">
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
                <div class="c-canvas__wrap ${canvasStyle}" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
            <div class="canvas-scroller" ref="canvasScroller"></div>
            <div class="canvas-scroller-title">
                <h1>Scroll down</h1>
            </div>
            <shape-right></shape-right>
            <shape-left></shape-left>
        </div>
    `;
};
