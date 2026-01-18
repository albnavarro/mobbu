//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {AnimatedPatternN0} from "./type"
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { animatedPatternN0Animation } from './animation/animation';

/** @type {MobComponent<AnimatedPatternN0>} */
export const AnimatedPatternN0Fn = ({
    onMount,
    getState,
    setRef,
    getRef,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};

    onMount(() => {
        const { canvas } = getRef();

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                destroy();

                destroy = animatedPatternN0Animation({
                    canvas,
                    ...getState(),
                });
            });
        });

        const unsubscribeResize = MobCore.useResize(() => {
            destroy();

            destroy = animatedPatternN0Animation({
                canvas,
                ...getState(),
            });
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
            destroy();
            unsubscribeResize();

            // @ts-ignore
            destroy = null;
        };
    });

    return html`
        <div>
            <div class="c-canvas">
                <div class="background-shape">${proxi.background}</div>
                <div
                    class="c-canvas__wrap"
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
