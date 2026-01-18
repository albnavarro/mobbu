//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {CaterpillarN1} from "./type"
 */

import { MobCore } from '@mobCore';
import { html } from '@mobJs';
import { caterpillarN1Animation } from './animation/animation';

/** @type {MobComponent<CaterpillarN1>} */
export const CaterpillarN1Fn = ({
    onMount,
    getState,
    getRef,
    setRef,
    bindEffect,
    getProxi,
}) => {
    const proxi = getProxi();

    onMount(() => {
        const { canvas } = getRef();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        let destroy = () => {};

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                destroy();

                destroy = caterpillarN1Animation({
                    canvas,
                    ...getState(),
                });
            });
        });

        MobCore.useFrame(() => {
            proxi.isMounted = true;
        });

        return () => {
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
