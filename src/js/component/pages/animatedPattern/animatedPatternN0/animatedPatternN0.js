//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { AnimatedPatternN0 } from './type';
 **/

import { MobCore } from '../../../../mobCore';
import { canvasBackground } from '../../../../utils/canvasUtils';
import { animatedPatternN0Animation } from './animation/animation';

/** @type {MobComponent<AnimatedPatternN0>} */
export const AnimatedPatternN0Fn = ({
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

        const destroyAnimation = animatedPatternN0Animation({
            canvas,
            ...getState(),
        });

        MobCore.useFrame(() => {
            setState('isMounted', true);
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
