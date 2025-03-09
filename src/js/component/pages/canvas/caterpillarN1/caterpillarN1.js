//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { CaterpillarN1 } from './type';
 **/

import { MobCore } from '../../../../mobCore';
import { canvasBackground } from '../../../../utils/canvasUtils';
import { caterpillarN1Animation } from './animation/animation';

/** @type {MobComponent<CaterpillarN1>} */
export const CaterpillarN1Fn = ({
    onMount,
    html,
    setState,
    getState,
    getRef,
    setRef,
    bindEffect,
}) => {
    document.body.style.background = canvasBackground;

    onMount(() => {
        const { canvas } = getRef();

        const destroyAnimation = caterpillarN1Animation({
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
