//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { ScrollerN1 } from './type';
 * @import { SetStateByName } from '../../../../mobjs/type';
 * @import { ScrollDownLabel } from '../../../common/scrolldownLabel/type';
 * @import { CodeButton } from '../../../common/codeButton/type';]
 **/

import { getLegendData } from '../../../../data';
import { mobCore } from '../../../../mobCore';
import { setStateByName } from '../../../../mobjs';
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
    hideFooterShape,
    showFooterShape,
} from '../../../common/shapes/shapUtils';
import { scrollerN1Animation } from './animation/animation';

/** @type {MobComponent<ScrollerN1>} */
export const ScrollerN1Fn = ({ onMount, html, getState, setRef, getRef }) => {
    document.body.style.background = '#000000';

    onMount(() => {
        if (motionCore.mq('max', 'desktop')) {
            document.body.style.background = '';
            return;
        }

        /** @type {SetStateByName<ScrollDownLabel>} */
        const setScrollDownState = setStateByName('scroll_down_label');

        /** @type {SetStateByName<CodeButton>} */
        const setCodeButtonState = setStateByName('global-code-button');

        /**
         * Show scroll down label.
         */
        setScrollDownState('active', true);

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

        // Footer shape
        hideFooterShape();

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

            /**
             * Hide scroll down label.
             */
            setScrollDownState('active', false);
            resetQuickNavState();
            resetAnimationTitle();
            setCodeButtonState('drawers', []);
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
