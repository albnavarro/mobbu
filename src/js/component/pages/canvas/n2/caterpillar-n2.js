//@ts-check

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState
 * } from "@mobJsType"
 * @import {CaterpillarN2} from "./type"
 */

import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';
import { caterpillarN2Animation } from './animation/animation';

/**
 * @param {object} params
 * @param {ProxiState<CaterpillarN2>} params.proxi
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindObject} params.bindObject
 * @returns {string[]}
 */
function getControls({ proxi, delegateEvents, bindObject }) {
    /**
     * Generic buttons
     */
    const buttons = Object.entries(proxi.buttons).map(([className, value]) => {
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

    const inputId = MobCore.getUnivoqueId();

    /**
     * Extract delegate event.
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

    const range = htmlObject({
        className: 'controls-item',
        content: {
            tag: 'li',
            className: 'controls-item',
            content: [
                {
                    className: 'controls-range',
                    content: [
                        {
                            tag: 'input',
                            attributes: {
                                id: inputId,
                                type: 'range',
                                min: '0',
                                max: '720',
                                value: proxi.rotation,
                                step: 1,
                            },
                            modules: delegate,
                        },
                    ],
                },
                {
                    tag: 'label',
                    attributes: { for: inputId },
                    className: 'controls-range-value',
                    content: bindObject`deg: ${() => proxi.rotationlabel}`,
                },
            ],
        },
    });

    return [...buttons, range];
}

/** @type {MobComponent<CaterpillarN2>} */
export const CaterpillarN2Fn = ({
    onMount,
    setRef,
    getRef,
    bindEffect,
    getProxi,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getProxi();

    onMount(({ element }) => {
        const { canvas } = getRef();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        let destroy = () => {};

        /**
         * Inizializa animation and get anima methods.
         */
        const animationMethods = caterpillarN2Animation({
            canvas,
            proxi,
        });

        /**
         * - Wait one frame to get right canvas dimension.
         */
        MobCore.useFrame(() => {
            MobCore.useNextTick(() => {
                ({ destroy } = animationMethods);
            });
        });

        /**
         * Inizalize controls handler.
         */
        Object.entries(proxi.buttons).forEach(([className, value]) => {
            const { method } = value;
            const btn = element.querySelector(`.${className}`);
            // @ts-ignore
            btn?.addEventListener('click', () => animationMethods?.[method]());
        });

        MobCore.useFrame(() => {
            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        });

        return () => {
            destroy();

            // @ts-ignore
            destroy = null;
        };
    });

    return htmlObject({
        content: [
            {
                className: 'c-canvas',
                content: [
                    {
                        className: 'l-background-shape is-light',
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
                            ...getControls({
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
        ],
    });
};
