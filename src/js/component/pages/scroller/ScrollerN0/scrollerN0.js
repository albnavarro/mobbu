import { getLegendData } from '../../../../data';
import { scrollerN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const ScrollerN0 = ({ onMount, render, getState, staticProps }) => {
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

    return render(/* HTML */ `
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <CodeButton
                    ${staticProps({
                        drawers: {
                            description: source.description,
                            js: source.js,
                            scss: source.scss,
                            component: source.component,
                        },
                        style: 'legend',
                    })}
                >
                </CodeButton>
                <div class="c-canvas__wrap c-canvas__wrap--border">
                    <canvas></canvas>
                </div>
            </div>
            <div class="canvas-scroller"></div>
            <div class="canvas-scroller-title">
                <h1>Scroll down</h2>
            </div>
        </div>
    `);
};
