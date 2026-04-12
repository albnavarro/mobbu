import { fromObject } from '@mobJs';
import { startData, state1, state2, state3 } from './data';
import { DynamicListButton } from './button/definition';
import { DynamicListRepeater } from './repeaters/definition';
import { DynamicListCardInner } from './repeaters/card/innerCard/definition';

/**
 * @import {
 *   BindProps,
 *   DelegateEvents,
 *   MobComponent,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {DynamicListButtonType} from "./button/type"
 * @import {DynamicListCardInnerType} from "./repeaters/card/innerCard/type"
 * @import {DynamicListRepeaterType} from "./repeaters/type"
 * @import {DynamicList} from "./type"
 */

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
 * @param {BindProps<DynamicList, DynamicListButtonType>} param.bindProps
 * @param {DynamicList['state']} param.proxi
 */
function getButton({ staticProps, delegateEvents, bindProps, proxi }) {
    return buttons.map((column, index) => {
        const { data, buttonLabel } = column;

        return fromObject({
            component: DynamicListButton,
            className: 'dynamic-list-button',
            modules: [
                staticProps(
                    /** @type {DynamicListButtonType['props']} */ ({
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
                    /** @returns {ReturnBindProps<DynamicListButtonType>} */
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
 * @param {BindProps<DynamicList, DynamicListRepeaterType>} param.bindProps
 * @param {DynamicList['state']} param.proxi
 */
function getRepeaters({ bindProps, staticProps, proxi }) {
    return repeaters.map((item, index) => {
        const { key, clean, label } = item;

        return fromObject({
            component: DynamicListRepeater,
            modules: [
                staticProps(
                    /** @type {DynamicListRepeaterType['props']} */ ({
                        listId: index,
                        key,
                        clean,
                        label,
                    })
                ),
                bindProps(
                    /** @returns {ReturnBindProps<DynamicListRepeaterType>} */
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

    /**
     * Header
     */
    const headerBlock = {
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
                        component: DynamicListButton,
                        className: 'dynamic-list-button',
                        modules: [
                            staticProps(
                                /** @type {DynamicListButtonType['props']} */ ({
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
                        component: DynamicListButton,
                        className: 'dynamic-list-button',
                        modules: [
                            staticProps(
                                /** @type {DynamicListButtonType['props']} */ ({
                                    label: '- counter: ( min 0 )',
                                })
                            ),
                            delegateEvents({
                                click: async () => {
                                    updateState('counter', (prev) => {
                                        if (prev > 0) return (prev -= 1);
                                        return prev;
                                    });
                                },
                            }),
                        ],
                    },
                ],
            },
        ],
    };

    /**
     * InvalidateBlock counter
     */
    const invalidateBlock = {
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
                                component: DynamicListCardInner,
                                modules: bindProps(
                                    /** @returns {ReturnBindProps<DynamicListCardInnerType>} */
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
    };

    return fromObject({
        className: 'c-dynamic-list',
        content: [
            headerBlock,
            invalidateBlock,

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
