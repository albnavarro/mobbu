//@ts-check

import { DetailOffcanvas } from '@commonComponent/detail-off-canvas/definition';
import { MathAnimation } from '@commonComponent/math-animation/definition';
import { H1Standalone } from '@commonComponent/typography/h1-standalone/definition';
import { htmlObject, MobJs } from '@mobJs';

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState,
 *   SetRef
 * } from '@mobJsType'
 */

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').RosaDiGrandiPage>} params.proxi
 * @param {SetRef<import('./type').RosaDiGrandiPage>} params.setRef
 * @param {GetRef<import('./type').RosaDiGrandiPage>} params.getRef
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindObject} params.bindObject
 */
const getControls = ({ proxi, delegateEvents, bindObject }) => {
    const numerators = htmlObject({
        tag: 'li',
        className: 'controls-item',
        content: [
            {
                tag: 'span',
                className: 'controls-label',
                attributes: { for: 'numerators' },
                content: bindObject`numerators: <strong>${() => proxi.numeratorsLabel}</strong>`,
            },
            {
                className: 'controls-range',
                content: {
                    tag: 'input',
                    className: 'controls-input',
                    attributes: {
                        id: 'numerators',
                        type: 'range',
                        min: 0,
                        max: 10,
                        step: 1,
                        value: proxi.numerators,
                    },
                    modules: delegateEvents({
                        input: (/** @type {InputEvent} */ event) => {
                            const { currentTarget } = event;
                            if (!currentTarget) return;

                            // @ts-ignore
                            const value = currentTarget.value;
                            proxi.numeratorsLabel = Number(value);
                        },
                        'change:force': (/** @type {InputEvent} */ event) => {
                            const { currentTarget } = event;
                            if (!currentTarget) return;

                            // @ts-ignore
                            const value = currentTarget.value;
                            proxi.numerators = Number(value);
                        },
                    }),
                },
            },
        ],
    });

    const denominator = htmlObject({
        tag: 'li',
        className: 'controls-item',
        content: [
            {
                tag: 'span',
                className: 'controls-label',
                attributes: { for: 'denominator' },
                content: bindObject`denominator: <strong>${() => proxi.denominatorLabel}</strong>`,
            },
            {
                className: 'controls-range',
                content: {
                    tag: 'input',
                    className: 'controls-input',
                    attributes: {
                        id: 'denominator',
                        type: 'range',
                        min: 0,
                        max: 10,
                        step: 1,
                        value: proxi.denominator,
                    },
                    modules: delegateEvents({
                        input: (/** @type {InputEvent} */ event) => {
                            const { target } = event;
                            if (!target) return;

                            // @ts-ignore
                            const value = target.value;
                            proxi.denominatorLabel = Number(value);
                        },
                        'change:force': (/** @type {InputEvent} */ event) => {
                            const { target } = event;
                            if (!target) return;

                            // @ts-ignore
                            const value = target.value;
                            proxi.denominator = Number(value);
                        },
                    }),
                },
            },
        ],
    });

    return [numerators, denominator];
};

/** @type {MobComponent<import('./type').RosaDiGrandiPage>} */
export const RosaDiGrandiPageFn = ({
    getSelfProxi,
    delegateEvents,
    invalidate,
    getRef,
    setRef,
    bindObject,
}) => {
    const proxi = getSelfProxi();

    return htmlObject({
        className: 'l-rosa',
        content: [
            {
                component: H1Standalone,
                modules: MobJs.staticProps(
                    /** @type {import('@commonComponent/typography/h1-standalone/type').H1Standalone['props']} */ ({
                        text: 'Rosa di grandi',
                    })
                ),
            },
            {
                component: DetailOffcanvas,
                content: getControls({
                    proxi,
                    getRef,
                    setRef,
                    delegateEvents,
                    bindObject,
                }),
            },
            {
                className: 'animation-container',
                content: invalidate({
                    observe: [() => proxi.numerators, () => proxi.denominator],
                    render: () => {
                        return htmlObject({
                            component: MathAnimation,
                            modules: MobJs.staticProps({
                                name: 'rosaDiGrandi',
                                showNavigation: false,
                                numberOfStaggers: 10,
                                args: [
                                    proxi.numerators,
                                    proxi.denominator,
                                    proxi.duration,
                                    proxi.staggerEach,
                                ],
                            }),
                        });
                    },
                }),
            },
        ],
    });
};
