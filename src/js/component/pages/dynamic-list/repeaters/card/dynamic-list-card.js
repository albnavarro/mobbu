/**
 * @import {
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {DynamicListButton} from "../../button/type"
 * @import {DynamicCounter} from "./counter/type"
 * @import {DynamicListCardInner} from "./innerCard/type"
 * @import {DynamicListCard} from "./type"
 */

import { fromObject, MobJs } from '@mobJs';
import { innerData } from '@pagesComponent/dynamic-list/data';

/** @param {number} numberOfItem */
function createArray(numberOfItem) {
    return [...Array.from({ length: numberOfItem }).keys()].map((i) => i + 1);
}

/**
 * @param {object} params
 * @param {StaticProps<DynamicListCardInner>} params.staticProps
 * @param {DelegateEvents} params.delegateEvents
 * @param {ProxiState<DynamicListCard>} params.proxi
 */
const getInvalidateRender = ({ staticProps, delegateEvents, proxi }) => {
    return createArray(proxi.counter).map((item) => {
        return fromObject({
            tag: 'dynamic-list-card-inner',
            modules: [
                staticProps(
                    /** @type {DynamicListCardInner['props']} */ ({
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
    });
};

/** @type {MobComponent<DynamicListCard>} */
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

    return fromObject({
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
                        tag: 'dynamic-list-button',
                        className: 'repeater-card-button',
                        modules: [
                            delegateEvents({
                                click: () => {
                                    proxi.isSelected = !proxi.isSelected;
                                },
                            }),
                            bindProps(
                                /** @returns {ReturnBindProps<DynamicListButton>} */
                                () => ({
                                    active: proxi.isSelected,
                                })
                            ),
                        ],
                        content: 'Select',
                    },
                    {
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
                    },
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
                    {
                        className: 'card-nested-child',
                        /**
                         * Component
                         */
                        content: {
                            tag: 'dynamic-list-empty',
                            /**
                             * Component
                             */
                            content: {
                                tag: 'dynamic-list-counter',
                                attributes: { slot: 'empty-slot' },
                                modules: [
                                    staticProps(
                                        /** @type {DynamicCounter['props']} */ ({
                                            parentListId: proxi.parentListId,
                                        })
                                    ),
                                    bindProps(
                                        /** @returns {ReturnBindProps<DynamicCounter>} */
                                        () => ({
                                            counter: proxi.counter,
                                        })
                                    ),
                                ],
                            },
                        },
                    },
                    {
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
                                tag: 'dynamic-list-button',
                                className: 'repeater-card-button',
                                modules: delegateEvents({
                                    click: async () => {
                                        repeaterIndex =
                                            repeaterIndex < innerData.length - 1
                                                ? repeaterIndex + 1
                                                : 0;

                                        proxi.innerData =
                                            innerData[repeaterIndex];
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
                                        return fromObject({
                                            tag: 'dynamic-list-card-inner',
                                            modules: bindProps(
                                                /** @returns {ReturnBindProps<DynamicListCardInner>} */
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
                                        return fromObject({
                                            tag: 'dynamic-list-card-inner',
                                            modules: bindProps(
                                                /** @returns {ReturnBindProps<DynamicListCardInner>} */
                                                () => ({
                                                    key: `${current.value.key}`,
                                                })
                                            ),
                                        });
                                    },
                                }),
                            },
                        ],
                    },
                    {
                        className: 'card-invalidate',
                        content: [
                            {
                                tag: 'p',
                                content: {
                                    tag: 'strong',
                                    content:
                                        'Inner invalidate<br /> on counter mutation:',
                                },
                            },
                            {
                                content: invalidate({
                                    observe: () => proxi.counter,
                                    render: () => {
                                        return fromObject({
                                            content: getInvalidateRender({
                                                delegateEvents,
                                                staticProps,
                                                proxi,
                                            }),
                                        });
                                    },
                                }),
                            },
                        ],
                    },
                ],
            },
        ],
    });
};
