//@ts-check

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiSelfState
 * } from '@mobJsType'
 * @import {ScrollerN1} from './type'
 */

import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';
import {
    activateScrollDownArrow,
    deactivateScrollDownArrow,
} from '../../../common/scroll-down-label/utils';
import { scrollerN1Animation } from './animation/animation';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { DetailOffcanvas } from '@commonComponent/detail-off-canvas/definition';

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
export const ScrollerN1Function = ({
    onMount,
    setRef,
    getRef,
    bindEffect,
    getSelfProxi,
    delegateEvents,
    bindObject,
}) => {
    const proxi = getSelfProxi();

    onMount(() => {
        /** @type {() => void} */
        let destroy;

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
                destroy?.();

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

        return () => {
            destroy?.();
            deactivateScrollDownArrow();
            destroy = () => {};
        };
    });

    return htmlObject({
        content: [
            {
                component: H1Standalone,
                modules: MobJs.staticProps(
                    /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                        text: 'Canvas Scroller N1',
                    })
                ),
            },
            {
                className: 'c-canvas is-fixed',
                content: [
                    {
                        className: 'l-background-shape',
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
            {
                className: 'c-canvas-scroller',
                modules: setRef('canvasScroller'),
            },
        ],
    });
};
