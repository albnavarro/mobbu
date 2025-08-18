//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {ScrollerN1} from './type';
 * @import {AnimationTitle} from '@commonComponent/animation-title/type';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { canvasBackground } from '@utils/canvas-utils';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scroll-down-label/utils';
import { scrollerN1Animation } from './animation/animation';

/** @type {MobComponent<ScrollerN1>} */
export const ScrollerN1Fn = ({
    onMount,
    getState,
    setState,
    setRef,
    getRef,
    bindEffect,
    getProxi,
    staticProps,
}) => {
    const proxi = getProxi();

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

        MobCore.useFrame(() => {
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
                    class="c-canvas__wrap"
                    ${bindEffect({
                        toggleClass: { active: () => proxi.isMounted },
                    })}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
                <animation-title
                    ${staticProps(
                        /** @type {AnimationTitle['state']} */ ({
                            title: 'Scroll control/<span>Canvas 2d</span>',
                            list: ['ScrollerTween', 'ScrollTrigger'],
                        })
                    )}
                ></animation-title>
            </div>
            <div class="c-canvas-scroller" ${setRef('canvasScroller')}></div>
        </div>
    `;
};
