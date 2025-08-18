//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {AnimatedPatternN0} from './type';
 * @import {AnimationTitle} from '@commonComponent/animation-title/type';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { canvasBackground } from '@utils/canvas-utils';
import { animatedPatternN0Animation } from './animation/animation';

/** @type {MobComponent<AnimatedPatternN0>} */
export const AnimatedPatternN0Fn = ({
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
        const { canvas } = getRef();

        const destroyAnimation = animatedPatternN0Animation({
            canvas,
            ...getState(),
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
            destroyAnimation();
            document.body.style.background = '';
        };
    });

    return html`
        <div>
            <div class="c-canvas">
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
                            title: 'Animated pattern/<span>Canvas 2d</span>',
                            list: ['TimeTween', 'AsyncTimeline'],
                        })
                    )}
                ></animation-title>
            </div>
        </div>
    `;
};
