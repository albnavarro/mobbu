import { getLegendData } from '../../../../data';
import { scrollerN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const ScrollerN0 = ({ onMount, html, getState, staticProps }) => {
    onMount(({ element }) => {
        const canvas = element.querySelector('canvas');
        const canvasScroller = element.querySelector('.canvas-scroller');

        /**
         * Prevent landing at bottom of the page.
         */
        window.scrollTo(0, 0);

        const destroyAnimation = scrollerN0Animation({
            canvas,
            canvasScroller,
            ...getState(),
        });

        return () => {
            destroyAnimation();
        };
    });

    const { caterpillarN1 } = getLegendData();
    const { source } = caterpillarN1;

    return html`
        <div>
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
                <div class="c-canvas__wrap">
                    <canvas></canvas>
                </div>
            </div>
            <div class="canvas-scroller"></div>
            <div class="canvas-scroller-title">
                <h1>Scroll down</h2>
            </div>
        </div>
    `;
};
