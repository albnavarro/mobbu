//@ts-check

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { scrollerN0Animation } from './animation/animation';

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./type').ScrollerN0>}
 */
export const ScrollerN0Fn = ({ onMount, html, getState }) => {
    const { prevRoute, nextRoute, title } = getState();
    document.body.style.background = '#000000';

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/scrolldownLabel/type').ScrollDownLabel>}
     */
    const setScrollDownState = setStateByName('scroll_down_label');

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/nextPage/type').QuickNav>}
     */
    const setQuickNavState = setStateByName('quick_nav');

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/animationTitle/type').AnimationTitle>}
     */
    const setMainTitleState = setStateByName('animation_title');

    /**
     * @type {import('../../../../mobjs/type').SetStateByName<import('../../../common/codeButton/type').CodeButton>}
     */
    const setCodeButtonState = setStateByName('global-code-button');

    onMount(({ ref }) => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        /**
         * Show scroll down label.
         */
        setScrollDownState('active', true);

        /**
         * Quicknav
         */
        setQuickNavState('active', true);
        setQuickNavState('prevRoute', prevRoute);
        setQuickNavState('nextRoute', nextRoute);

        /**
         * Title.
         */
        setMainTitleState('align', 'left');
        setMainTitleState('color', 'white');
        setMainTitleState('title', title);

        /**
         * Code button
         */
        const { scrollerN0 } = getLegendData();
        const { source } = scrollerN0;
        setCodeButtonState('drawers', [
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
        ]);
        setCodeButtonState('color', 'white');

        /**
         * Refs
         */
        const { wrap, canvas, canvasScroller } = ref;

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
            setScrollDownState('active', false);
            setQuickNavState('active', false);
            setQuickNavState('prevRoute', '');
            setQuickNavState('nextRoute', '');
            setMainTitleState('align', '');
            setMainTitleState('title', '');
            setCodeButtonState('drawers', []);
            document.body.style.background = '';
        };
    });

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
                <div class="c-canvas__wrap c-canvas__wrap--wrapped" ref="wrap">
                    <canvas ref="canvas"></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ref="canvasScroller"></div>
        </div>
    `;
};
