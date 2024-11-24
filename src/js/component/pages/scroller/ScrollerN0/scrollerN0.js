//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { ScrollerN0 } from './type';
 **/

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { motionCore } from '../../../../mobMotion';
import {
    resetAnimationTitle,
    updateAnimationTitle,
} from '../../../common/animationTitle/utils';
import {
    resetCodeButton,
    updateCodeButton,
} from '../../../common/codeButton/utils';
import {
    resetQuickNavState,
    updateQuickNavState,
} from '../../../common/quickNav/utils';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scrolldownLabel/utils';
import {
    hideFooterShape,
    showFooterShape,
} from '../../../common/shapes/shapUtils';
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

        /** Show scroll down label. */
        activateScrollDownArrow();

        /** Quicknav */
        updateQuickNavState({
            active: true,
            prevRoute,
            nextRoute,
            color: 'white',
        });

        /** Title */
        updateAnimationTitle({
            align: 'left',
            title,
            color: 'white',
        });

        // Footer shape
        hideFooterShape();

        /**
         * Code button
         */
        const { scrollerN0 } = getLegendData();
        const { source } = scrollerN0;
        updateCodeButton({
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
            color: 'white',
        });

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
            deactivateScrollDownArrow();
            resetQuickNavState();
            resetAnimationTitle();
            resetCodeButton();
            document.body.style.background = '';
            showFooterShape();
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
