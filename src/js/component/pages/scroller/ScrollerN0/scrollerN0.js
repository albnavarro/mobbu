import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { getIdByInstanceName, setStateById } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { scrollerN0Animation } from './animation/animation';

/**
 * @param {import('../../../../mobjs/type').componentType}
 */
export const ScrollerN0 = ({ onMount, html, getState, staticProps }) => {
    const { prevRoute, nextRoute } = getState();

    onMount(({ refs }) => {
        if (motionCore.mq('max', 'desktop')) return;

        /**
         * Show scroll down label.
         */
        const scrollLabelId = getIdByInstanceName('scroll_down_label');
        setStateById(scrollLabelId, 'active', true);

        const quicknavId = getIdByInstanceName('quick_nav');
        setStateById(quicknavId, 'active', true);
        setStateById(quicknavId, 'prevRoute', prevRoute);
        setStateById(quicknavId, 'nextRoute', nextRoute);

        /**
         * Refs
         */
        const { wrap, canvas, canvasScroller } = refs;

        /**
         * Prevent landing at bottom of the page.
         */
        window.scrollTo(0, 0);

        const destroyAnimation = scrollerN0Animation({
            canvas,
            canvasScroller,
            ...getState(),
        });

        mobCore.useFrame(() => {
            wrap.classList.add('active');
        });

        return () => {
            destroyAnimation();

            /**
             * Hide scroll down label.
             */
            setStateById(scrollLabelId, 'active', false);
            setStateById(quicknavId, 'active', false);
            setStateById(quicknavId, 'prevRoute', '');
            setStateById(quicknavId, 'nextRoute', '');
        };
    });

    const { scrollerN0 } = getLegendData();
    const { source } = scrollerN0;

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
                <div class="c-canvas__wrap" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ref="canvasScroller"></div>
        </div>
    `;
};
