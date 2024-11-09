//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { ScrollerN0 } from './type';
 * @import { SetStateByName } from '../../../../mobjs/type';
 * @import { ScrollDownLabel } from '../../../common/scrolldownLabel/type';
 * @import { QuickNav } from '../../../common/nextPage/type';
 * @import { AnimationTitle } from '../../../common/animationTitle/type';
 * @import { CodeButton } from '../../../common/codeButton/type';]
 **/

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { setStateByName } from '../../../../mobjs';
import { motionCore } from '../../../../mobMotion';
import { scrollerN0Animation } from './animation/animation';

/** @type {MobComponent<ScrollerN0>} */
export const ScrollerN0Fn = ({ onMount, html, getState, setRef, getRef }) => {
    const { prevRoute, nextRoute, title } = getState();
    document.body.style.background = '#000000';

    onMount(() => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        /** @type {SetStateByName<ScrollDownLabel>} */
        const setScrollDownState = setStateByName('scroll_down_label');

        /** @type {SetStateByName<QuickNav>} */
        const setQuickNavState = setStateByName('quick_nav');

        /** @type {SetStateByName<AnimationTitle>} */
        const setMainTitleState = setStateByName('animation_title');

        /** @type {SetStateByName<CodeButton>} */
        const setCodeButtonState = setStateByName('global-code-button');

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
        const { wrap, canvas, canvasScroller } = getRef();

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
     * Desktop
     */
    return html`
        <div>
            <div class="c-canvas c-canvas--fixed ">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${setRef('wrap')}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${setRef('canvasScroller')}></div>
        </div>
    `;
};
