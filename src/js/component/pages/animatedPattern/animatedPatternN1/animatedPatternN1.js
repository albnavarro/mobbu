//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { AnimatedPatternN1 } from './type';
 **/

import { mobCore } from '../../../../mobCore';
import { canvasBackground } from '../../../../utils/canvasUtils';
import { animatedPatternN1Animation } from './animation/animation';

/** @type {MobComponent<AnimatedPatternN1>} */
export const AnimatedPatternN1Fn = ({
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
        const { canvas } = getRef();

        const destroyAnimation = animatedPatternN1Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
            setState('isMounted', true);
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
                        bind: 'isMounted',
                        toggleClass: { active: () => getState().isMounted },
                    })}
                >
                    <canvas ${setRef('canvas')}></canvas>
                </div>
            </div>
        </div>
    `;
};
