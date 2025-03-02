//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { CaterpillarN0 } from './type';
 **/

import { mobCore } from '../../../../mobCore';
import { canvasBackground } from '../../../../utils/canvasUtils';
import { caterpillarN0Animation } from './animation/animation';

/** @type {MobComponent<CaterpillarN0>} */
export const CaterpillarN0Fn = ({
    onMount,
    html,
    setRef,
    getRef,
    setState,
    getState,
    bindEffect,
}) => {
    document.body.style.background = canvasBackground;

    onMount(() => {
        const { canvas } = getRef();

        /**
         * Animation.
         */
        const destroyAnimation = caterpillarN0Animation({
            canvas,
            ...getState(),
        });

        mobCore.useFrame(() => {
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
