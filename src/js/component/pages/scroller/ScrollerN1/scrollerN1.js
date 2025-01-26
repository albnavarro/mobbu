//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { ScrollerN1 } from './type';
 **/

import { mobCore } from '../../../../mobCore';
import { motionCore } from '../../../../mobMotion';
import {
    resetAnimationTitle,
    updateAnimationTitle,
} from '../../../common/animationTitle/utils';
import {
    resetQuickNavState,
    updateQuickNavState,
} from '../../../common/quickNav/utils';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scrolldownLabel/utils';
import { scrollerN1Animation } from './animation/animation';

/** @type {MobComponent<ScrollerN1>} */
export const ScrollerN1Fn = ({ onMount, html, getState, setRef, getRef }) => {
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
            prevRoute: '#scrollerN0?version=4&activeId=4',
            nextRoute: '',
            color: 'white',
        });

        /** Title */
        updateAnimationTitle({
            align: 'left',
            title: 'Scroller N1',
            color: 'white',
        });

        /**
         * Refs
         */
        const { wrap, canvas, canvasScroller } = getRef();

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
            deactivateScrollDownArrow();
            resetQuickNavState();
            resetAnimationTitle();
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
