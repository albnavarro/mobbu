//@ts-check

import { MathAnimation } from '@commonComponent/math-animation/definition';
import { htmlObject, MobJs } from '@mobJs';

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiState,
 *   SetRef
 * } from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {ProxiState<import('./type').RosaDiGrandiPage>} params.proxi
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
                        change: (/** @type {InputEvent} */ event) => {
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
                        change: (/** @type {InputEvent} */ event) => {
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
    getProxi,
    delegateEvents,
    invalidate,
    bindEffect,
    getRef,
    setRef,
    bindObject,
}) => {
    const proxi = getProxi();

    return htmlObject({
        className: 'l-rosa',
        content: [
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
                        getRef,
                        setRef,
                        delegateEvents,
                        bindObject,
                    }),
                ],
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
