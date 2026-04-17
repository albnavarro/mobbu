/**
 * @import {MobComponent} from "@mobJsType"
 */

import { htmlObject } from '@mobJs';
import { mathPairAnimation } from './pair-animation';
import { fakeAnimation } from './animations/fake-animation';
import { MobCore } from '@mobCore';

/** @type {MobComponent<import('./type').MathAnimationType>} */
export const MathAnimationFn = ({
    getProxi,
    setRef,
    getRef,
    getRefs,
    delegateEvents,
    onMount,
}) => {
    const proxi = getProxi();
    const showNavigationClass = proxi.showNavigation ? 'active' : '';
    const targetSize = 3;
    const gap = targetSize / proxi.numberOfStaggers;

    const staggers = Array.from({ length: proxi.numberOfStaggers }).map(
        (_, index) => {
            return {
                size: targetSize - gap * index,
                opacity: 1 / index,
            };
        }
    );

    /**
     * Create fake methods before onMount to prevent nav buttons error.
     */
    const fake = fakeAnimation();
    let { destroy, play, stop, resume } = fake;

    onMount(({ element }) => {
        const { target: targets } = getRefs();
        const { canvas } = getRef();

        /**
         * Probably style is not computree here. Await first frame available, so canvas has exact dimension.
         */
        MobCore.useFrame(() => {
            ({ destroy, play, stop, resume } = mathPairAnimation[proxi.name](
                {
                    targets,
                    container: element,
                    canvas,
                },
                ...proxi.args
            ));

            play();
        });

        const unsubscribeResize = MobCore.useResize(() => {
            stop();
            destroy();

            ({ destroy, play, stop, resume } = mathPairAnimation[proxi.name](
                {
                    targets,
                    container: element,
                    canvas,
                },
                ...proxi.args
            ));

            play();
        });

        return () => {
            destroy();
            unsubscribeResize();

            // @ts-ignore
            destroy = null;

            // @ts-ignore
            play = null;

            // @ts-ignore
            stop = null;

            // @ts-ignore
            resume = null;
        };
    });

    /**
     * STagger item
     */
    const staggersBlock = staggers.map(({ size, opacity }) => {
        return htmlObject({
            tag: 'span',
            className: 'trail-item',
            style: {
                width: `${size}rem`,
                height: `${size}rem`,
                opacity: `${opacity}`,
            },
            modules: setRef('target'),
            content: {
                tag: 'span',
                className: 'trail-item-inner',
            },
        });
    });

    return htmlObject({
        className: 'c-math',
        content: [
            {
                tag: 'canvas',
                modules: setRef('canvas'),
            },
            {
                className: ['nav', showNavigationClass],
                content: [
                    {
                        tag: 'button',
                        className: 'play',
                        modules: delegateEvents({
                            click: () => {
                                resume();
                            },
                        }),
                    },
                    {
                        tag: 'button',
                        className: 'stop',
                        modules: delegateEvents({
                            click: () => {
                                stop();
                            },
                        }),
                    },
                ],
            },
            {
                className: 'trails',
                content: staggersBlock,
            },
        ],
    });
};
