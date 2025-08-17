//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {ScrollerN0} from './type';
 * @import {AnimationTitle} from '@commonComponent/animation-title/type';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { canvasBackground } from '@utils/canvas-utils';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scroll-down-label/utils';
import { scrollerN0Animation } from './animation/animation';

/** @type {MobComponent<ScrollerN0>} */
export const ScrollerN0Fn = ({
    onMount,
    getState,
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

        /**
         * Prevent landing at bottom of the page.
         */
        window.scrollTo(0, 0);

        const destroyAnimation = scrollerN0Animation({
            canvas,
            canvasScroller,
            ...getState(),
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
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
                            title: 'Scroll control',
                            list: [
                                'Sequencer',
                                'CreateStagger',
                                'ScrollTrigger',
                            ],
                        })
                    )}
                ></animation-title>
            </div>
            <div class="c-canvas-scroller" ${setRef('canvasScroller')}></div>
        </div>
    `;
};
