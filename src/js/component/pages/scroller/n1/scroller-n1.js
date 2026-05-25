//@ts-check

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiSelfState
 * } from "@mobJsType"
 * @import {ScrollerN1} from "./type"
 */

import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scroll-down-label/utils';
import { scrollerN1Animation } from './animation/animation';

/**
 * Component is a singleton
 */
let unsubscribeEscHandler = () => {};

/**
 * @param {object} params
 * @param {ProxiSelfState<ScrollerN1>} params.proxi
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindObject} params.bindObject
 * @returns {HTMLElement}
 */
function getControls({ proxi, delegateEvents, bindObject }) {
    const inputId = MobCore.getUnivoqueId();

    /**
     * Range controls
     */
    const delegate = delegateEvents({
        'change:force': (/** @type {InputEvent} */ event) => {
            const currentTarget = /** @type {HTMLInputElement} */ (
                event.currentTarget
            );

            if (!currentTarget) return;
            proxi.rotation = Number(currentTarget.value);
        },
        input: (/** @type {InputEvent} */ event) => {
            const currentTarget = /** @type {HTMLInputElement} */ (
                event.currentTarget
            );

            if (!currentTarget) return;

            proxi.rotationlabel = Number(currentTarget.value);
        },
    });

    return htmlObject({
        className: 'controls-item',
        content: [
            {
                className: 'controls-range',
                content: {
                    tag: 'input',
                    attributes: {
                        type: 'range',
                        id: inputId,
                        min: 360,
                        max: 2220,
                        value: proxi.rotation,
                        step: 10,
                    },
                    modules: delegate,
                },
            },
            {
                tag: 'label',
                className: 'controls-range-value',
                attributes: { for: inputId },
                content: bindObject`rotationValue: ${() => proxi.rotationlabel}`,
            },
        ],
    });
}

/** @type {MobComponent<ScrollerN1>} */
export const ScrollerN1Fn = ({
    onMount,
    setRef,
    getRef,
    bindEffect,
    getSelfProxi,
    delegateEvents,
    bindObject,
    watch,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        // eslint-disable-next-line unicorn/consistent-function-scoping
        let destroy = () => {};

        /** Show scroll down label. */
        activateScrollDownArrow();

        /**
         * Refs
         */
        const { canvas, canvasScroller } = getRef();

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                destroy();

                destroy = scrollerN1Animation({
                    canvas,
                    canvasScroller,
                    disableOffcanvas: proxi.disableOffcanvas,
                    proxi,
                });
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
            destroy();
            deactivateScrollDownArrow();

            // @ts-ignore
            destroy = null;
            unsubscribeEscHandler();
        };
    });

    return htmlObject({
        content: [
            {
                className: 'c-canvas is-fixed',
                content: [
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
                            getControls({
                                proxi,
                                delegateEvents,
                                bindObject,
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
            {
                className: 'c-canvas-scroller',
                modules: setRef('canvasScroller'),
            },
        ],
    });
};
