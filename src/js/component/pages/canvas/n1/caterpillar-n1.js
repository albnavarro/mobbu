/**
 * @import {
 *   BindEffect,
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiSelfState
 * } from "@mobJsType"
 * @import {CaterpillarN1} from "./type"
 */

import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { caterpillarN1Animation } from './animation/animation';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';

/**
 * Component is a singleton
 */
let unsubscribeEscHandler = () => {};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<CaterpillarN1>} params.bindEffect
 * @param {BindObject} params.bindObject
 * @param {ProxiSelfState<CaterpillarN1>} params.proxi
 * @returns {HTMLElement}
 */
function getControls({ delegateEvents, bindEffect, bindObject, proxi }) {
    return htmlObject({
        tag: 'li',
        className: 'controls-item',
        content: [
            {
                tag: 'button',
                className: 'controls-button',
                modules: [
                    delegateEvents({
                        click: () => {
                            proxi.stopBlackOne();
                            proxi.blackOneIsStopped = true;
                        },
                    }),
                    bindEffect({
                        toggleAttribute: {
                            disabled: () => proxi.blackOneIsStopped,
                        },
                    }),
                ],
                content: 'Stop black one rotation',
            },
            {
                tag: 'p',
                className: 'controls-status',
                content: bindObject`${() => (proxi.blackOneIsStopped ? 'Black one rotation is off' : '')}`,
            },
        ],
    });
}

/** @type {MobComponent<CaterpillarN1>} */
export const CaterpillarN1Fn = ({
    onMount,
    getRef,
    setRef,
    bindEffect,
    getSelfProxi,
    delegateEvents,
    bindObject,
    watch,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        const { canvas } = getRef();
        let methods = {
            destroy: () => {},
            stopBlackOne: () => {},
        };

        /**
         * Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                proxi.destroy();

                methods = caterpillarN1Animation({
                    canvas,
                    disableOffcanvas: proxi.disableOffcanvas,
                });

                proxi.destroy = methods.destroy;
                proxi.stopBlackOne = methods.stopBlackOne;
            });
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
            proxi.destroy = () => {};
            proxi.stopBlackOne = () => {};
            // @ts-ignore
            methods = null;
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
                                text: 'Canvas: Caterpillar N1',
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
                            getControls({
                                delegateEvents,
                                bindEffect,
                                bindObject,
                                proxi,
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
