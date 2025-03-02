//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { ScrollerN1 } from './type';
 **/

import { mobCore } from '../../../../mobCore';
import { canvasBackground } from '../../../../utils/canvasUtils';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scrolldownLabel/utils';
import { scrollerN1Animation } from './animation/animation';

/** @type {MobComponent<ScrollerN1>} */
export const ScrollerN1Fn = ({
    onMount,
    html,
    getState,
    setState,
    setRef,
    getRef,
    bindEffect,
}) => {
    document.body.style.background = canvasBackground;

    onMount(() => {
        /** Show scroll down label. */
        activateScrollDownArrow();

        /**
         * Refs
         */
        const { canvas, canvasScroller } = getRef();

        const destroyAnimation = scrollerN1Animation({
            canvas,
            canvasScroller,
            ...getState(),
        });

        mobCore.useFrame(() => {
            setState('isMounted', true);
        });

        return () => {
            destroyAnimation();
            deactivateScrollDownArrow();
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
                    ${bindEffect({
                        bind: 'isMounted',
                        toggleClass: { active: () => getState().isMounted },
                    })}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
            <div class="c-canvas-scroller" ${setRef('canvasScroller')}></div>
        </div>
    `;
};
