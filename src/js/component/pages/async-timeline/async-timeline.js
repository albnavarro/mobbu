/**
 * @import {MobComponent} from "@mobJsType"
 * @import {
 *   AsyncTimeline,
 *   AsyncTimelineControls
 * } from "./type"
 */

import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { asyncTimelineanimation } from './animation/animation';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';

/**
 * Component is a singleton
 */
let unsubscribeEscHandler = () => {};

/**
 * @param {object} params
 * @param {AsyncTimelineControls} params.buttons
 * @returns {HTMLElement[]}
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
    getSelfProxi,
    delegateEvents,
    watch,
}) => {
    const proxi = getSelfProxi();

    let methods = {};

    /** @type {() => void} */
    let destroy;

    onMount(({ element }) => {
        const { canvas } = getRef();

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                destroy?.();

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
            destroy?.();

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

        watch(
            () => proxi.controlsActive,
            (isActive) => {
                if (isActive) {
                    unsubscribeEscHandler = MobCore.useEscHandler(
                        ({ preventDefault }) => {
                            proxi.controlsActive = false;
                            preventDefault();
                        }
                    );
                    return;
                }

                unsubscribeEscHandler();
            }
        );

        return () => {
            unsubscribeResize();
            destroy?.();
            unsubscribeEscHandler();
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
                            text: 'Sync timeline',
                        })
                    ),
                },
                {
                    tag: 'button',
                    className: 'controls-open',
                    attributes: {
                        type: 'button',
                        'aria-controls': 'animation-control',
                        'aria-haspopup': 'dialog',
                    },
                    modules: [
                        delegateEvents({
                            click: () => {
                                proxi.controlsActive = true;
                            },
                        }),
                        bindEffect({
                            toggleAttribute: {
                                tabindex: () =>
                                    proxi.controlsActive ? '-1' : '0',
                            },
                        }),
                    ],
                    content: 'show controls',
                },
                {
                    tag: 'ul',
                    className: 'controls',
                    attributes: {
                        id: 'animation-control',
                        role: 'dialog',
                        'aria-label': 'Animation controls',
                        'aria-modal': 'false',
                    },
                    modules: bindEffect({
                        toggleClass: {
                            active: () => proxi.controlsActive,
                        },
                        toggleAttribute: {
                            inert: () => !proxi.controlsActive,
                        },
                    }),
                    content: [
                        {
                            tag: 'button',
                            className: 'controls-close',
                            attributes: { type: 'button' },
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
