//@ts-check

/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState
 * } from '@mobJsType'
 * @import {AnimatedPatternN0} from './type'
 */

import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { animatedPatternN0Animation } from './animation/animation';
import { params } from './variations';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';

/**
 * Component is a singleton
 */
let unsubscribeEscHandler = () => {};

/**
 * @param {object} params
 * @param {ProxiSelfState<AnimatedPatternN0>} params.proxi
 * @param {GetRef<AnimatedPatternN0>} params.getRef
 * @returns {void}
 */
const createAnimation = ({ proxi, getRef }) => {
    proxi.destroy();

    proxi.destroy = animatedPatternN0Animation({
        canvas: getRef().canvas,
        ...params[proxi.currentParamsId].params,
        // disableOffcanvas: detectFirefox() || detectSafari() ? true : false,
        disableOffcanvas: true,
    });
};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiSelfState<AnimatedPatternN0>} params.proxi
 * @param {GetRef<AnimatedPatternN0>} params.getRef
 * @param {BindEffect<AnimatedPatternN0>} params.bindEffect
 * @returns {HTMLElement[]}
 */
function getControls({ delegateEvents, bindEffect, proxi, getRef }) {
    return params.map(({ label }, index) => {
        return htmlObject({
            tag: 'li',
            className: 'controls-item',
            content: {
                tag: 'button',
                attributes: { type: 'button' },
                className: 'controls-button',
                modules: [
                    delegateEvents({
                        click: () => {
                            proxi.currentParamsId = index;
                            createAnimation({ proxi, getRef });
                        },
                    }),
                    bindEffect({
                        toggleClass: {
                            active: () => proxi.currentParamsId === index,
                        },
                    }),
                ],
                content: label,
            },
        });
    });
}

/** @type {MobComponent<AnimatedPatternN0>} */
export const AnimatedPatternN0Fn = ({
    onMount,
    setRef,
    getRef,
    bindEffect,
    getSelfProxi,
    delegateEvents,
    watch,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                createAnimation({ proxi, getRef });
            });
        });

        const unsubscribeResize = MobCore.useResize(() => {
            createAnimation({ proxi, getRef });
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
            proxi.destroy();

            // @ts-ignore
            proxi.destroy = () => {};
            unsubscribeResize();
            unsubscribeEscHandler();
        };
    });

    return htmlObject({
        content: [
            {
                className: 'c-canvas',
                content: [
                    {
                        component: H1Standalone,
                        modules: MobJs.staticProps(
                            /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                                text: 'Canvas: animated pattern N0',
                            })
                        ),
                    },
                    {
                        className: 'l-background-shape',
                        content: proxi.background,
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
                        content: 'variations',
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
                            ...getControls({
                                delegateEvents,
                                bindEffect,
                                proxi,
                                getRef,
                            }),
                        ],
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
        ],
    });
};
