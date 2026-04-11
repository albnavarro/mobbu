/**
 * @import {
 *   BindProps,
 *   DelegateEvents,
 *   MobComponent,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {DynamicListButton} from "./button/type"
 * @import {DynamicListCardInner} from "./repeaters/card/innerCard/type"
 * @import {DynamicListRepeater} from "./repeaters/type"
 * @import {DynamicList} from "./type"
 */

import { fromObject } from '@mobJs';
import { startData, state1, state2, state3 } from './data';

const buttons = [
    {
        buttonLabel: 'sample1',
        data: state1,
    },
    {
        buttonLabel: 'salmple2',
        data: state2,
    },
    {
        buttonLabel: 'sample3',
        data: state3,
    },
    {
        buttonLabel: 'Initial',
        data: startData,
    },
];

const repeaters = [
    {
        label: 'repeater with key',
        key: 'key',
        clean: false,
    },
    {
        label: 'repeater without key',
        key: '',
        clean: false,
    },
    {
        label: 'repeater clear',
        key: '',
        clean: true,
    },
];

/**
 * @param {object} param
 * @param {StaticProps} param.staticProps
 * @param {DelegateEvents} param.delegateEvents
 * @param {BindProps<DynamicList, DynamicListButton>} param.bindProps
 * @param {DynamicList['state']} param.proxi
 */
function getButton({ staticProps, delegateEvents, bindProps, proxi }) {
    return buttons.map((column, index) => {
        const { data, buttonLabel } = column;

        return fromObject({
            tag: 'dynamic-list-button',
            className: 'dynamic-list-button',
            modules: [
                staticProps(
                    /** @type {DynamicListButton['props']} */ ({
                        label: buttonLabel,
                    })
                ),
                delegateEvents({
                    click: async () => {
                        proxi.data = data;
                        proxi.activeSample = index;
                    },
                }),
                bindProps(
                    /** @returns {ReturnBindProps<DynamicListButton>} */
                    () => ({
                        active: index === proxi.activeSample,
                    })
                ),
            ],
        });
    });
}

/**
 * @param {object} param
 * @param {StaticProps} param.staticProps
 * @param {BindProps<DynamicList, DynamicListRepeater>} param.bindProps
 * @param {DynamicList['state']} param.proxi
 */
function getRepeaters({ bindProps, staticProps, proxi }) {
    return repeaters.map((item, index) => {
        const { key, clean, label } = item;

        return fromObject({
            tag: 'dynamic-list-repeater',
            modules: [
                staticProps(
                    /** @type {DynamicListRepeater['props']} */ ({
                        listId: index,
                        key,
                        clean,
                        label,
                    })
                ),
                bindProps(
                    /** @returns {ReturnBindProps<DynamicListRepeater>} */
                    () => ({
                        data: proxi.data,
                        counter: proxi.counter,
                    })
                ),
            ],
        });
    });
}

/** @type {MobComponent<DynamicList>} */
export const DynamicListFn = ({
    updateState,
    staticProps,
    bindProps,
    delegateEvents,
    invalidate,
    bindText,
    getProxi,
}) => {
    const proxi = getProxi();

    return fromObject({
        className: 'c-dynamic-list',
        content: [
            {
                className: 'header',
                content: [
                    {
                        className: 'header-top',
                        content: [
                            ...getButton({
                                delegateEvents,
                                staticProps,
                                bindProps,
                                proxi,
                            }),
                            {
                                tag: 'dynamic-list-button',
                                className: 'dynamic-list-button',
                                modules: [
                                    staticProps(
                                        /** @type {DynamicListButton['props']} */ ({
                                            label: '+ counter ( max: 10 )',
                                        })
                                    ),
                                    delegateEvents({
                                        click: async () => {
                                            updateState('counter', (prev) => {
                                                return prev + 1;
                                            });
                                        },
                                    }),
                                ],
                            },
                            {
                                tag: 'dynamic-list-button',
                                className: 'dynamic-list-button',
                                modules: [
                                    staticProps(
                                        /** @type {DynamicListButton['props']} */ ({
                                            label: '- counter: ( min 0 )',
                                        })
                                    ),
                                    delegateEvents({
                                        click: async () => {
                                            updateState('counter', (prev) => {
                                                if (prev > 0)
                                                    return (prev -= 1);
                                                return prev;
                                            });
                                        },
                                    }),
                                ],
                            },
                        ],
                    },
                ],
            },

            /**
             * Invalidate
             */
            {
                className: 'invalidate',
                content: [
                    {
                        tag: 'h4',
                        className: 'invalidate-title',
                        content: 'Invalidate component on counter mutation:',
                    },
                    {
                        content: invalidate({
                            observe: () => proxi.counter,
                            render: () => {
                                return fromObject({
                                    content: {
                                        tag: 'dynamic-list-card-inner',
                                        modules: bindProps(
                                            /** @returns {ReturnBindProps<DynamicListCardInner>} */
                                            () => ({
                                                key: `${proxi.counter}`,
                                            })
                                        ),
                                    },
                                });
                            },
                        }),
                    },
                ],
            },

            /**
             * Counter
             */
            {
                className: 'counter',
                content: [
                    {
                        tag: 'h4',
                        content: 'List counter',
                    },
                    {
                        tag: 'span',
                        content: bindText`${'counter'}`,
                    },
                ],
            },

            /**
             * Repeaters
             */
            {
                className: 'repeaters-container',
                content: {
                    className: 'repeaters-grid',
                    content: getRepeaters({ bindProps, staticProps, proxi }),
                },
            },
        ],
    });
};
