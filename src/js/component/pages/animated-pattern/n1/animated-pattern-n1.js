//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {AnimatedPatternN1} from "./type"
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
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

                destroy = animatedPatternN1Animation({
                    canvas,
                    ...getState(),
                });
            });
        });

        const unsubscribeResize = MobCore.useResize(() => {
            destroy();

            destroy = animatedPatternN1Animation({
                canvas,
                ...getState(),
            });
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
            unsubscribeResize();
            destroy();

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
