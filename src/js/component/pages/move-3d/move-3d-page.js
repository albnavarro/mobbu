import { Move3D } from '@commonComponent/move-3d/definition';
import { MobCore } from '@mobCore';
import { htmlObject } from '@mobJs';

/**
 * @import {
 *   BindEffect,
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiSelfState,
 *   ReturnBindProps
 * } from "@mobJsType"
 */

/**
 * Component is a singleton
 */
let unsubscribeEscHandler = () => {};

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<import('./type').Move3DPage>} params.bindEffect
 * @param {BindObject} params.bindObject
 * @param {ProxiSelfState<import('./type').Move3DPage>} params.proxi
 */
const getControls = ({ delegateEvents, bindEffect, bindObject, proxi }) => {
    /**
     * Input range element
     */
    const controlFactor = {
        className: 'controls-range',
        content: [
            {
                tag: 'input',
                attributes: {
                    type: 'range',
                    value: proxi.factor,
                },
                modules: delegateEvents({
                    input: (/** @type {KeyboardEvent} */ event) => {
                        const value =
                            /** @type {HTMLInputElement} */ (
                                event.currentTarget
                            ).value ?? 0;
                        proxi.factor = Number(value);
                    },
                }),
            },
        ],
    };

    /**
     * Input range element
     */
    const controlXDepth = {
        tag: 'input',
        attributes: {
            type: 'range',
            value: proxi.xDepth,
        },
        modules: delegateEvents({
            input: (/** @type {KeyboardEvent} */ event) => {
                const value =
                    /** @type {HTMLInputElement} */ (event.currentTarget)
                        .value ?? 0;

                proxi.xDepth = Number(value);
            },
        }),
    };

    /**
     * Input range element
     */
    const controlXLimit = {
        tag: 'input',
        attributes: {
            type: 'range',
            value: proxi.xLimit,
            max: proxi.xLimit,
        },
        modules: delegateEvents({
            input: (/** @type {KeyboardEvent} */ event) => {
                const value =
                    /** @type {HTMLInputElement} */ (event.currentTarget)
                        .value ?? 0;
                proxi.xLimit = Number(value);
            },
        }),
    };

    /**
     * Input range element
     */
    const controlYDepth = {
        tag: 'input',
        attributes: {
            type: 'range',
            value: proxi.yDepth,
        },
        modules: delegateEvents({
            input: (/** @type {KeyboardEvent} */ event) => {
                const value =
                    /** @type {HTMLInputElement} */ (event.currentTarget)
                        .value ?? 0;
                proxi.yDepth = Number(value);
            },
        }),
    };

    /**
     * Input range element
     */
    const controlYLimit = {
        tag: 'input',
        attributes: {
            type: 'range',
            value: proxi.yLimit,
            max: proxi.yLimit,
        },
        modules: delegateEvents({
            input: (/** @type {KeyboardEvent} */ event) => {
                const value =
                    /** @type {HTMLInputElement} */ (event.currentTarget)
                        .value ?? 0;
                proxi.yLimit = Number(value);
            },
        }),
    };

    return htmlObject({
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
                className: 'close-controls',
                attributes: {
                    type: 'button',
                },
                modules: delegateEvents({
                    click: () => {
                        proxi.controlsActive = false;
                    },
                }),
            },
            {
                className: 'controls-block',
                content: [
                    {
                        className: 'controls-range',
                        content: controlFactor,
                    },
                    {
                        content: bindObject`factor: ${() => proxi.factor}`,
                    },
                ],
            },
            {
                className: 'controls-block',
                content: [
                    {
                        className: 'controls-range',
                        content: controlXDepth,
                    },
                    {
                        content: bindObject`xDepth: ${() => proxi.xDepth}`,
                    },
                ],
            },
            {
                className: 'controls-block',
                content: [
                    {
                        className: 'controls-range',
                        content: controlXLimit,
                    },
                    {
                        content: bindObject`xLimit: ${() => proxi.xLimit}`,
                    },
                ],
            },
            {
                className: 'controls-block',
                content: [
                    {
                        className: 'controls-range',
                        content: controlYDepth,
                    },
                    {
                        content: bindObject`yDepth: ${() => proxi.yDepth}`,
                    },
                ],
            },
            {
                className: 'controls-block',
                content: [
                    {
                        className: 'controls-range',
                        content: controlYLimit,
                    },
                    {
                        content: bindObject`yLimit: ${() => proxi.yLimit}`,
                    },
                ],
            },
            {
                className: 'controls-block',
                content: {
                    tag: 'button',
                    attributes: { type: 'button' },
                    className: 'controls-button',
                    modules: delegateEvents({
                        click: () => {
                            proxi.debug = !proxi.debug;
                        },
                    }),
                    content: 'Toggle Debug',
                },
            },
        ],
    });
};

/** @type {MobComponent<import('./type').Move3DPage>} */
export const Move3DPagefn = ({
    bindProps,
    delegateEvents,
    bindObject,
    getSelfProxi,
    bindEffect,
    onMount,
    watch,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
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

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {
            unsubscribeEscHandler();
        };
    });

    return htmlObject({
        className: 'l-move3d-page',
        content: [
            {
                tag: 'button',
                attributes: {
                    type: 'button',
                    'aria-controls': 'animation-control',
                    'aria-haspopup': 'dialog',
                },
                className: 'show-controls',
                modules: [
                    delegateEvents({
                        click: () => {
                            proxi.controlsActive = true;
                        },
                    }),
                    bindEffect({
                        toggleAttribute: {
                            tabindex: () => (proxi.controlsActive ? '-1' : '0'),
                        },
                    }),
                ],
                content: 'show controls',
            },
            getControls({ delegateEvents, bindEffect, bindObject, proxi }),
            {
                component: Move3D,
                modules: bindProps(
                    /** @returns {ReturnBindProps<import('../../common/move-3d/type').Move3DType>} */
                    () => ({
                        shape: proxi.data,
                        xDepth: proxi.xDepth,
                        yDepth: proxi.yDepth,
                        xLimit: proxi.xLimit,
                        yLimit: proxi.yLimit,
                        factor: proxi.factor,
                        debug: proxi.debug,
                        drag: proxi.drag,
                    })
                ),
            },
        ],
    });
};
