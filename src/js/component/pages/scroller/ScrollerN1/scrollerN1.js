//@ts-check

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { scrollerN1Animation } from './animation/animation';

/**
 * @type {import('../../../../mobjs/type').mobComponent<import('./type.t').ScrollerN1>}
 */
export const ScrollerN1Fn = ({ onMount, html, getState }) => {
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
        setQuickNavState('nextRoute', '');
        setQuickNavState('prevRoute', '#scrollerN0?version=4&activeId=4');

        /**
         * Title.
         */
        setMainTitleState('align', 'left');
        setMainTitleState('color', 'white');
        setMainTitleState('title', 'Scroller N1');

        /**
         * Code button
         */
        const { scrollerN1 } = getLegendData();
        const { source } = scrollerN1;
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
