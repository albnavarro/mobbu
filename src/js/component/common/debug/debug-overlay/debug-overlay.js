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
import { DebugFilterHead } from './debug-filter/head/definition';
import { tabLoopTrap } from '@componentLibs/utils/utils';
import { MobCore } from '@mobCore';
import { setFcousToDebugBtn } from '../utils';

/**
 * @import {
 *   MobComponent,
 *   ProxiSelfState,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {DebugHeadType} from "./head/type"
 */

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').DebugOverlayType>} params.proxi
 */
const closeOverlayAndSetFocusBack = ({ proxi }) => {
    proxi.active = false;

    MobCore.useNextLoop(() => {
        setFcousToDebugBtn();
    });
};

/**
 * Component is a singleton
 */
let unsubscribeTabHandler = () => {};
let unsubscribeEscHandler = () => {};

/** @type {MobComponent<import('./type').DebugOverlayType>} */
export const DebugOverlayFn = ({
    delegateEvents,
    addMethod,
    bindProps,
    invalidate,
    bindEffect,
    getSelfProxi,
    onMount,
    watch,
}) => {
    const proxi = getSelfProxi();

    addMethod('open', () => {
        proxi.active = true;
    });

    addMethod('toggle', () => {
        proxi.active = !proxi.active;
        if (proxi.active) return;

        MobCore.useNextLoop(() => {
            setFcousToDebugBtn();
        });
    });

    onMount(({ element }) => {
        watch(
            () => proxi.active,
            (isActive) => {
                if (isActive) {
                    /**
                     * Esc coltrol.
                     */
                    unsubscribeEscHandler = MobCore.useEscHandler(
                        ({ preventDefault }) => {
                            closeOverlayAndSetFocusBack({ proxi });
                            preventDefault();
                        }
                    );

                    /**
                     * Tab loop inside overlay
                     */
                    unsubscribeTabHandler = MobCore.useTabHandler(
                        ({ direction, preventDefault }) => {
                            tabLoopTrap({ element, direction, preventDefault });
                        }
                    );

                    return;
                }

                unsubscribeEscHandler();
                unsubscribeTabHandler();
            }
        );

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
            unsubscribeEscHandler();
            unsubscribeTabHandler();
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
                            return htmlObject({ component: DebugFilterHead });

                        // Remove component
                        return htmlObject({});
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

                return htmlObject({});
            },
        }),
    };

    return htmlObject({
        tag: 'dialog',
        className: 'c-debug-overlay',
        attributes: { id: 'debug-dialog' },
        modules: bindEffect({
            toggleClass: { active: () => proxi.active },
            toggleAttribute: { inert: () => !proxi.active },
        }),
        content: [
            {
                tag: 'button',
                className: 'background',
                attributes: { type: 'button', tabindex: '-1' },
                modules: delegateEvents({
                    click: () => {
                        closeOverlayAndSetFocusBack({ proxi });
                        proxi.listType = DEBUG_USE_TREE;
                    },
                }),
            },
            {
                className: 'grid',
                content: [
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
                ],
            },
            {
                tag: 'button',
                className: 'close',
                attributes: {
                    type: 'button',
                    'arial-label': 'Close debug dialog',
                },
                modules: delegateEvents({
                    click: () => {
                        closeOverlayAndSetFocusBack({ proxi });
                        proxi.listType = DEBUG_USE_TREE;
                    },
                }),
            },
        ],
    });
};
