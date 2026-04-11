import { fromObject } from '@mobJs';

/**
 * @import {
 *   BindEffect,
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState,
 *   ReturnBindProps
 * } from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<import('./type').Move3DPage>} params.bindEffect
 * @param {BindObject} params.bindObject
 * @param {ProxiState<import('./type').Move3DPage>} params.proxi
 */
const getControls = ({ delegateEvents, bindEffect, bindObject, proxi }) => {
    return fromObject({
        className: 'controls',
        modules: bindEffect({
            toggleClass: {
                active: () => proxi.controlsActive,
            },
        }),
        content: [
            {
                tag: 'button',
                className: 'close-controls',
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
                        content: [
                            {
                                tag: 'input',
                                attributes: {
                                    type: 'range',
                                    value: proxi.factor,
                                },
                                modules: delegateEvents({
                                    input: (
                                        /** @type {KeyboardEvent} */ event
                                    ) => {
                                        const value =
                                            /** @type {HTMLInputElement} */ (
                                                event.currentTarget
                                            ).value ?? 0;
                                        proxi.factor = Number(value);
                                    },
                                }),
                            },
                        ],
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
                        content: [
                            {
                                tag: 'input',
                                attributes: {
                                    type: 'range',
                                    value: proxi.xDepth,
                                },
                                modules: delegateEvents({
                                    input: (
                                        /** @type {KeyboardEvent} */ event
                                    ) => {
                                        const value =
                                            /** @type {HTMLInputElement} */ (
                                                event.currentTarget
                                            ).value ?? 0;

                                        proxi.xDepth = Number(value);
                                    },
                                }),
                            },
                        ],
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
                        content: [
                            {
                                tag: 'input',
                                attributes: {
                                    type: 'range',
                                    value: proxi.xLimit,
                                    max: proxi.xLimit,
                                },
                                modules: delegateEvents({
                                    input: (
                                        /** @type {KeyboardEvent} */ event
                                    ) => {
                                        const value =
                                            /** @type {HTMLInputElement} */ (
                                                event.currentTarget
                                            ).value ?? 0;
                                        proxi.xLimit = Number(value);
                                    },
                                }),
                            },
                        ],
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
                        content: [
                            {
                                tag: 'input',
                                attributes: {
                                    type: 'range',
                                    value: proxi.yDepth,
                                },
                                modules: delegateEvents({
                                    input: (
                                        /** @type {KeyboardEvent} */ event
                                    ) => {
                                        const value =
                                            /** @type {HTMLInputElement} */ (
                                                event.currentTarget
                                            ).value ?? 0;
                                        proxi.yDepth = Number(value);
                                    },
                                }),
                            },
                        ],
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
                        content: [
                            {
                                tag: 'input',
                                attributes: {
                                    type: 'range',
                                    value: proxi.yLimit,
                                    max: proxi.yLimit,
                                },
                                modules: delegateEvents({
                                    input: (
                                        /** @type {KeyboardEvent} */ event
                                    ) => {
                                        const value =
                                            /** @type {HTMLInputElement} */ (
                                                event.currentTarget
                                            ).value ?? 0;
                                        proxi.yLimit = Number(value);
                                    },
                                }),
                            },
                        ],
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
    getProxi,
    bindEffect,
}) => {
    const proxi = getProxi();

    return fromObject({
        className: 'l-move3d-page',
        content: [
            {
                tag: 'button',
                attributes: { type: 'button' },
                className: 'show-controls',
                modules: delegateEvents({
                    click: () => {
                        proxi.controlsActive = true;
                    },
                }),
                content: 'show controls',
            },
            getControls({ delegateEvents, bindEffect, bindObject, proxi }),
            {
                tag: 'move-3d',
                modules: bindProps(
                    /** @returns {ReturnBindProps<import('../../common/move-3d/type').Move3D>} */
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
