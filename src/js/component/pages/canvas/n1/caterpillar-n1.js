/**
 * @import {
 *   BindEffect,
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState
 * } from "@mobJsType"
 * @import {CaterpillarN1} from "./type"
 */

import { MobCore } from '@mobCore';
import { fromObject } from '@mobJs';
import { caterpillarN1Animation } from './animation/animation';

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<CaterpillarN1>} params.bindEffect
 * @param {BindObject} params.bindObject
 * @param {ProxiState<CaterpillarN1>} params.proxi
 * @returns {string}
 */
function getControls({ delegateEvents, bindEffect, bindObject, proxi }) {
    return fromObject({
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
    getProxi,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getProxi();

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

        return () => {
            proxi.destroy();
            proxi.destroy = () => {};
            proxi.stopBlackOne = () => {};
            // @ts-ignore
            methods = null;
        };
    });

    return fromObject({
        content: [
            {
                className: 'c-canvas',
                content: [
                    {
                        className: 'l-background-shape',
                        content: proxi.background,
                    },
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
                                className: 'controls-close',
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
