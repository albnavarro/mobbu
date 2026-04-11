//@ts-check

/**
 * @import {MobComponent} from "@mobJsType"
 * @import {AnimatedPatternN1} from "./type"
 */

import { MobCore } from '@mobCore';
import { fromObject } from '@mobJs';
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
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        });

        return () => {
            unsubscribeResize();
            destroy();

            // @ts-ignore
            destroy = null;
        };
    });

    return fromObject({
        content: {
            className: 'c-canvas',
            content: [
                {
                    className: 'l-background-shape',
                    content: proxi.background,
                },
                {
                    className: 'canvas-container',
                    modules: bindEffect({
                        toggleClass: { active: () => proxi.isMounted },
                    }),
                    content: {
                        tag: 'canvas',
                        modules: setRef('canvas'),
                    },
                },
            ],
        },
    });
};
