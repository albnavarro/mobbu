//@ts-check

/**
 * @import {MobComponent} from '@mobJsType';
 * @import {AnimatedPatternN1} from './type';
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { canvasBackground } from '@utils/canvas-utils';
import { animatedPatternN1Animation } from './animation/animation';

/** @type {MobComponent<AnimatedPatternN1>} */
export const AnimatedPatternN1Fn = ({
    onMount,
    getState,
    setRef,
    getRef,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();
    document.body.style.background = canvasBackground;

    onMount(() => {
        const { canvas } = getRef();

        const destroyAnimation = animatedPatternN1Animation({
            canvas,
            ...getState(),
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
            document.body.style.background = '';
            destroyAnimation();
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div
                    class="c-canvas__wrap c-canvas__wrap--wrapped"
                    ${bindEffect({
                        toggleClass: { active: () => proxi.isMounted },
                    })}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
