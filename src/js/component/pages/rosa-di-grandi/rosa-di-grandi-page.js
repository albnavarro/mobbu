//@ts-check

import { MathAnimation } from '@commonComponent/math-animation/definition';
import { MobCore } from '@mobCore';
import { htmlObject, MobJs } from '@mobJs';

/**
 * Component is a singleton
 */
let unsubscribeEscHandler = () => {};

/**
 * @import {
 *   BindObject,
 *   DelegateEvents,
 *   GetRef,
 *   MobComponent,
 *   ProxiSelfState,
 *   SetRef
 * } from "@mobJsType"
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
    bindEffect,
    getRef,
    setRef,
    bindObject,
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
        className: 'l-rosa',
        content: [
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
                            tabindex: () => (proxi.controlsActive ? '-1' : '0'),
                        },
                    }),
                ],
                content: 'show controls',
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
