/**
 * @import {MobComponent} from "@mobJsType"
 * @import {
 *   AsyncTimeline,
 *   AsyncTimelineControls
 * } from "./type"
 */

import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
import { asyncTimelineanimation } from './animation/animation';

/**
 * @param {object} params
 * @param {AsyncTimelineControls} params.buttons
 * @returns {string[]}
 */
function getControls({ buttons }) {
    return Object.entries(buttons).map(([className, value]) => {
        const { label } = value;

        return htmlObject({
            tag: 'li',
            className: 'controls-item',
            content: {
                tag: 'button',
                attributes: { type: 'button' },
                className: `controls-button ${className}`,
                content: label,
            },
        });
    });
}

/** @type {MobComponent<AsyncTimeline>} */
export const AsyncTimelineFn = ({
    onMount,
    getState,
    setRef,
    getRef,
    bindEffect,
    getProxi,
    delegateEvents,
}) => {
    const proxi = getProxi();

    let methods = {};
    // eslint-disable-next-line unicorn/consistent-function-scoping
    let destroy = () => {};

    onMount(({ element }) => {
        const { canvas } = getRef();

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                destroy();

                methods = asyncTimelineanimation({
                    canvas,
                    ...getState(),
                });

                // @ts-ignore
                destroy = methods.destroy;

                // @ts-ignore
                methods?.play?.();
            });
        });

        const unsubscribeResize = MobCore.useResize(() => {
            destroy();

            methods = asyncTimelineanimation({
                canvas,
                ...getState(),
            });

            // @ts-ignore
            destroy = methods.destroy;

            // @ts-ignore
            methods?.play?.();
        });

        /**
         * Inizalize controls handler.
         */
        Object.entries(proxi.buttons).forEach(([className, value]) => {
            const { method } = value;
            const btn = element.querySelector(`.${className}`);
            // @ts-ignore
            btn?.addEventListener('click', () => methods?.[method]());
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
        };
    });

    return htmlObject({
        content: {
            className: 'c-canvas',
            content: [
                {
                    tag: 'button',
                    className: 'controls-open',
                    modules: delegateEvents({
                        click: () => {
                            proxi.controlsActive = true;
                        },
                    }),
                    content: 'show controls',
                },
                {
                    tag: 'ul',
                    className: 'controls',
                    modules: bindEffect({
                        toggleClass: {
                            active: () => proxi.controlsActive,
                        },
                    }),
                    content: [
                        {
                            tag: 'button',
                            attributes: { type: 'button' },
                            className: 'controls-close',
                            modules: delegateEvents({
                                click: () => {
                                    proxi.controlsActive = false;
                                },
                            }),
                        },
                        ...getControls({ buttons: proxi.buttons }),
                    ],
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
