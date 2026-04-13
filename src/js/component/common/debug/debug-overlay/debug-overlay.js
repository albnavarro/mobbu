// @ts-check

import { htmlObject, MobJs } from '@mobJs';
import { consoleLogDebug } from '../console-log';
import { DEBUG_USE_FILTER_COMPONENT, DEBUG_USE_TREE } from './constant';
import {
    debugComponentName,
    debugFilterListName,
    debugTreeName,
} from '@instanceName';
import { DebugTree } from './tree/definition';
import { DebugFilterList } from './debug-filter/list/definition';
import { DebugComponent } from './debug-component/definition';
import { DebugHead } from './head/definition';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {DebugHeadType} from "./head/type"
 */

/** @type {MobComponent<import('./type').DebugOverlayType>} */
export const DebugOverlayFn = ({
    delegateEvents,
    addMethod,
    bindProps,
    invalidate,
    bindEffect,
    getProxi,
    onMount,
}) => {
    const proxi = getProxi();

    addMethod('toggle', () => {
        proxi.active = !proxi.active;
    });

    onMount(() => {
        /**
         * Close overlay on route change. Avoid infinite debuf overlay filter item increase. If filter list is visible
         * avoid to count them.
         */
        const unsubScribeBeforeRouterChange = MobJs.beforeRouteChange(() => {
            proxi.active = false;
            proxi.listType = DEBUG_USE_TREE;
        });

        return () => {
            unsubScribeBeforeRouterChange();
        };
    });

    /**
     * Left header partial
     */
    const listHeader = {
        className: 'list-header',
        content: [
            /**
             * Left top header switch tree/list head
             */
            {
                content: invalidate({
                    observe: [() => proxi.listType, () => proxi.active],
                    render: () => {
                        if (proxi.listType === DEBUG_USE_TREE && proxi.active)
                            return htmlObject({
                                className: 'list-title',
                                content: 'Tree structure',
                            });

                        if (
                            proxi.listType === DEBUG_USE_FILTER_COMPONENT &&
                            proxi.active
                        )
                            return htmlObject({ tag: 'debug-filter-head' });

                        // Remove component
                        return '';
                    },
                }),
            },
            /**
             * Toggle List vs Tree
             */
            {
                content: [
                    {
                        tag: 'button',
                        className: 'list-toggle',
                        modules: [
                            delegateEvents({
                                click: () => {
                                    proxi.listType = DEBUG_USE_TREE;
                                },
                            }),
                            bindEffect({
                                toggleClass: {
                                    active: () =>
                                        proxi.listType === DEBUG_USE_TREE,
                                },
                            }),
                        ],
                        content: 'Tree',
                    },
                    {
                        tag: 'button',
                        className: 'list-toggle',
                        modules: [
                            delegateEvents({
                                click: () => {
                                    proxi.listType = DEBUG_USE_FILTER_COMPONENT;
                                },
                            }),
                            bindEffect({
                                toggleClass: {
                                    active: () =>
                                        proxi.listType ===
                                        DEBUG_USE_FILTER_COMPONENT,
                                },
                            }),
                        ],
                        content: 'Filter',
                    },
                ],
            },
        ],
    };

    /**
     * Right component partial
     */
    const listContent = {
        content: invalidate({
            observe: [() => proxi.listType, () => proxi.active],
            render: () => {
                if (proxi.listType === DEBUG_USE_TREE && proxi.active)
                    return htmlObject({
                        component: DebugTree,
                        attributes: { name: debugTreeName },
                    });

                if (
                    proxi.listType === DEBUG_USE_FILTER_COMPONENT &&
                    proxi.active
                )
                    return htmlObject({
                        component: DebugFilterList,
                        attributes: { name: debugFilterListName },
                    });

                return '';
            },
        }),
    };

    return htmlObject({
        className: 'c-debug-overlay',
        modules: bindEffect({
            toggleClass: { active: () => proxi.active },
        }),
        content: [
            {
                tag: 'button',
                className: 'background',
                attributes: { type: 'button' },
                modules: delegateEvents({
                    click: () => {
                        proxi.active = false;
                        proxi.listType = DEBUG_USE_TREE;
                    },
                }),
            },
            {
                tag: 'button',
                className: 'close',
                attributes: { type: 'button' },
                modules: delegateEvents({
                    click: () => {
                        proxi.active = false;
                        proxi.listType = DEBUG_USE_TREE;
                    },
                }),
            },
            {
                className: 'grid',
                content: [
                    {
                        tag: 'button',
                        className: 'log',
                        modules: delegateEvents({
                            click: () => {
                                consoleLogDebug();
                            },
                        }),
                        content: `console log`,
                    },
                    /**
                     * Top header
                     */
                    {
                        className: 'header',
                        content: {
                            component: DebugHead,
                            modules: bindProps(
                                /** @returns {ReturnBindProps<DebugHeadType>} */
                                () => ({
                                    active: proxi.active,
                                })
                            ),
                        },
                    },
                    /**
                     * Left column hider ( sitch list/tree & search in list ) & content
                     */
                    {
                        className: 'list',
                        content: [listHeader, listContent],
                    },
                    /**
                     * Right column single component
                     */
                    {
                        className: 'single-component',
                        content: {
                            component: DebugComponent,
                            attributes: { name: debugComponentName },
                        },
                    },
                ],
            },
        ],
    });
};
