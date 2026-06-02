//@ts-check

/**
 * @import {MobComponent} from '@mobJsType'
 * @import {AnimatedPatternN1} from './type'
 */

import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { animatedPatternN1Animation } from './animation/animation';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';

/** @type {MobComponent<AnimatedPatternN1>} */
export const AnimatedPatternN1Fn = ({
    onMount,
    getState,
    setRef,
    getRef,
    bindEffect,
    getSelfProxi,
}) => {
    const proxi = getSelfProxi();

    /** @type {() => void} */
    let destroy;

    onMount(() => {
        const { canvas } = getRef();

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                destroy?.();

                destroy = animatedPatternN1Animation({
                    canvas,
                    ...getState(),
                });
            });
        });

        const unsubscribeResize = MobCore.useResize(() => {
            destroy?.();

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
            destroy?.();
            destroy = () => {};
        };
    });

    return htmlObject({
        content: {
            className: 'c-canvas',
            content: [
                {
                    component: H1Standalone,
                    modules: MobJs.staticProps(
                        /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                            text: 'Canvas: animated pattern N1',
                        })
                    ),
                },
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
