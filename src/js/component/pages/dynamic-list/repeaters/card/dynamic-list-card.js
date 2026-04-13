import { htmlObject, MobJs } from '@mobJs';
import { innerData } from '@pagesComponent/dynamic-list/data';
import { DynamicListCardInner } from './innerCard/definition';
import { DynamicListButton } from '@pagesComponent/dynamic-list/button/definition';
import { DynamicListEmpty } from './empty/definition';
import { DynamicCounter } from './counter/definition';

/**
 * @import {
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {DynamicListButtonType} from "../../button/type"
 * @import {DynamicCounterType} from "./counter/type"
 * @import {DynamicListCardInnerType} from "./innerCard/type"
 * @import {DynamicListCardType} from "./type"
 */

/** @param {number} numberOfItem */
function createArray(numberOfItem) {
    return [...Array.from({ length: numberOfItem }).keys()].map((i) => i + 1);
}

/**
 * @param {object} params
 * @param {StaticProps<DynamicListCardInnerType>} params.staticProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiState<DynamicListCardType>} params.proxi
 */
const getInvalidateRender = ({ staticProps, delegateEvents, proxi }) => {
    return createArray(proxi.counter)
        .map((item) => {
            return htmlObject({
                component: DynamicListCardInner,
                modules: [
                    staticProps(
                        /** @type {DynamicListCardInnerType['props']} */ ({
                            key: `${item}`,
                        })
                    ),
                    delegateEvents({
                        click: () => {
                            console.log('invalidate inside reepater click');
                        },
                    }),
                ],
            });
        })
        .join('');
};

/** @type {MobComponent<DynamicListCardType>} */
export const DynamicListCardFn = ({
    onMount,
    key,
    staticProps,
    bindProps,
    id,
    delegateEvents,
    invalidate,
    repeat,
    bindText,
    bindEffect,
    getProxi,
    computed,
}) => {
    const proxi = getProxi();
    let repeaterIndex = 0;

    computed(
        () => proxi.innerDataUnivoque,
        () =>
            proxi.innerData.filter(
                (value, index, self) =>
                    self.map(({ key }) => key).indexOf(value.key) === index
            )
    );

    onMount(async () => {
        (async () => {
            await MobJs.tick();

            /**
             * Here proxi can be destroyed;
             */
            if (!('isMounted' in proxi)) return;

            proxi.isMounted = true;
        })();

        // eslint-disable-next-line unicorn/consistent-function-scoping
        return () => {};
    });

    const infoBlock = {
        className: 'card-info',
        content: [
            {
                tag: 'p',
                content: `id: ${id}`,
            },
            {
                tag: 'p',
                content: `list index: ${proxi.parentListId}`,
            },
            {
                tag: 'p',
                content: bindText`index: ${'index'}`,
            },
            {
                tag: 'p',
                content: bindText`label: ${'label'}`,
            },
            {
                tag: 'p',
                content: bindText`counter: ${'counter'}`,
            },
            {
                tag: 'p',
                content: `key: ${key.length > 0 ? key : 'no-key'}`,
            },
        ],
    };

    const nestedBlock = {
        className: 'card-nested-child',
        /**
         * Component
         */
        content: {
            component: DynamicListEmpty,
            /**
             * Component
             */
            content: {
                component: DynamicCounter,
                attributes: { slot: 'empty-slot' },
                modules: [
                    staticProps(
                        /** @type {DynamicCounterType['props']} */ ({
                            parentListId: proxi.parentListId,
                        })
                    ),
                    bindProps(
                        /** @returns {ReturnBindProps<DynamicCounterType>} */
                        () => ({
                            counter: proxi.counter,
                        })
                    ),
                ],
            },
        },
    };

    const repeatersBlock = {
        className: 'card-repeaters-wrap',
        content: [
            {
                tag: 'p',
                content: '<strong>Inner repeater:</strong>',
            },
            /**
             * Component
             */
            {
                component: DynamicListButton,
                className: 'repeater-card-button',
                modules: delegateEvents({
                    click: async () => {
                        repeaterIndex =
                            repeaterIndex < innerData.length - 1
                                ? repeaterIndex + 1
                                : 0;

                        proxi.innerData = innerData[repeaterIndex];
                        await MobJs.tick();
                    },
                }),
                content: 'Update:',
            },
            {
                className: 'card-repeater',
                content: repeat({
                    observe: () => proxi.innerData,
                    key: 'key',
                    render: ({ current }) => {
                        /**
                         * Component
                         */
                        return htmlObject({
                            tag: 'dynamic-list-card-inner',
                            modules: bindProps(
                                /** @returns {ReturnBindProps<DynamicListCardInnerType>} */
                                () => ({
                                    key: `${current.value.key}`,
                                })
                            ),
                        });
                    },
                }),
            },
            {
                className: 'card-repeater',
                content: repeat({
                    observe: () => proxi.innerData,
                    render: ({ current }) => {
                        /**
                         * Component
                         */
                        return htmlObject({
                            tag: 'dynamic-list-card-inner',
                            modules: bindProps(
                                /** @returns {ReturnBindProps<DynamicListCardInnerType>} */
                                () => ({
                                    key: `${current.value.key}`,
                                })
                            ),
                        });
                    },
                }),
            },
        ],
    };

    const invalidateBlock = {
        className: 'card-invalidate',
        content: [
            {
                tag: 'p',
                content: {
                    tag: 'strong',
                    content: 'Inner invalidate<br /> on counter mutation:',
                },
            },
            {
                content: invalidate({
                    observe: () => proxi.counter,
                    render: () => {
                        return getInvalidateRender({
                            delegateEvents,
                            staticProps,
                            proxi,
                        });
                    },
                }),
            },
        ],
    };

    return htmlObject({
        className: 'c-dynamic-card',
        modules: [
            bindEffect({
                toggleClass: {
                    active: () => proxi.isMounted,
                    'is-selected': () => proxi.isSelected,
                },
            }),
        ],
        content: [
            {
                className: 'card-container',
                content: [
                    {
                        tag: 'p',
                        className: 'card-title',
                        content: 'card content',
                    },
                    /**
                     * Component
                     */
                    {
                        component: DynamicListButton,
                        className: 'repeater-card-button',
                        modules: [
                            delegateEvents({
                                click: () => {
                                    proxi.isSelected = !proxi.isSelected;
                                },
                            }),
                            bindProps(
                                /** @returns {ReturnBindProps<DynamicListButtonType>} */
                                () => ({
                                    active: proxi.isSelected,
                                })
                            ),
                        ],
                        content: 'Select',
                    },
                    /**
                     * Info block
                     */
                    infoBlock,

                    /**
                     * Component
                     */
                    {
                        className: 'card-slot',
                        content: {
                            tag: 'mobjs-slot',
                            attributes: { name: 'card-label-slot' },
                        },
                    },

                    /**
                     * Nested block
                     */
                    nestedBlock,

                    /**
                     * Repeaters block
                     */
                    repeatersBlock,

                    /**
                     * Invalidate block
                     */
                    invalidateBlock,
                ],
            },
        ],
    });
};
