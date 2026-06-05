import { DetailOffcanvas } from '@commonComponent/detail-off-canvas/definition';
import { Move3D } from '@commonComponent/move-3d/definition';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { htmlObject, MobJs } from '@mobJs';

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiSelfState,
 *   ReturnBindProps
 * } from '@mobJsType'
 */

/**
 * @param {object} params
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindObject} params.bindObject
 * @param {ProxiSelfState<import('./type').Move3DPage>} params.proxi
 */
const getControls = ({ delegateEvents, bindObject, proxi }) => {
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
        content: [
            {
                className: 'controls-item',
                content: [
                    {
                        className: 'controls-range',
                        content: controlFactor,
                    },
                    {
                        className: 'dynamic-result',
                        content: bindObject`factor: ${() => proxi.factor}`,
                    },
                ],
            },
            {
                className: 'controls-item',
                content: [
                    {
                        className: 'controls-range',
                        content: controlXDepth,
                    },
                    {
                        className: 'dynamic-result',
                        content: bindObject`xDepth: ${() => proxi.xDepth}`,
                    },
                ],
            },
            {
                className: 'controls-item',
                content: [
                    {
                        className: 'controls-range',
                        content: controlXLimit,
                    },
                    {
                        className: 'dynamic-result',
                        content: bindObject`xLimit: ${() => proxi.xLimit}`,
                    },
                ],
            },
            {
                className: 'controls-item',
                content: [
                    {
                        className: 'controls-range',
                        content: controlYDepth,
                    },
                    {
                        className: 'dynamic-result',
                        content: bindObject`yDepth: ${() => proxi.yDepth}`,
                    },
                ],
            },
            {
                className: 'controls-item',
                content: [
                    {
                        className: 'controls-range',
                        content: controlYLimit,
                    },
                    {
                        className: 'dynamic-result',
                        content: bindObject`yLimit: ${() => proxi.yLimit}`,
                    },
                ],
            },
            {
                className: 'controls-item',
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
}) => {
    const proxi = getSelfProxi();

    return htmlObject({
        className: 'l-move3d-page',
        content: [
            {
                component: H1Standalone,
                modules: MobJs.staticProps(
                    /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                        text: 'Mov3D css',
                    })
                ),
            },
            {
                component: DetailOffcanvas,
                content: getControls({
                    delegateEvents,
                    bindObject,
                    proxi,
                }),
            },
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
