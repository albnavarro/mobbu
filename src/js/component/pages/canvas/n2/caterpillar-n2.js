//@ts-check

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiSelfState
 * } from '@mobJsType'
 * @import {CaterpillarN2} from './type'
 */

import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import { caterpillarN2Animation } from './animation/animation';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { DetailOffcanvas } from '@commonComponent/detail-off-canvas/definition';

/**
 * @param {object} params
 * @param {ProxiSelfState<CaterpillarN2>} params.proxi
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindObject} params.bindObject
 * @returns {HTMLElement[]}
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
                                type: 'range',
                                id: inputId,
                                min: 0,
                                max: 720,
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
    getSelfProxi,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getSelfProxi();

    onMount(({ element }) => {
        const { canvas } = getRef();

        /** @type {() => void} */
        let destroy;

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
            destroy?.();
            destroy = () => {};
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
                                text: 'Canvas: caterpillar N2',
                            })
                        ),
                    },
                    {
                        className: 'l-background-shape is-light',
                        content: proxi.background,
                    },
                    {
                        component: DetailOffcanvas,
                        content: getControls({
                            proxi,
                            delegateEvents,
                            bindObject,
                        }),
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
