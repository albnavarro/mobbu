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
import { setExpandedToDebugBtn, setFcousToDebugBtn } from '../utils';
import { resetSearchOverlayJustOpen, setSearchOverlayJustOpen } from './utils';

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
    setRef,
    getRef,
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

    /**
     * Qui intercettiamo il cambio di visualizzazione dei risultati da un'azione interna.
     *
     * - DebugTree usara questa informazione per abilitare il focus sulla propia area.
     */
    watch(
        () => proxi.listType,
        () => {
            resetSearchOverlayJustOpen();
        }
    );

    onMount(({ element }) => {
        watch(
            () => proxi.active,
            (isActive) => {
                if (isActive) {
                    /**
                     * Set toggle buttona rial label to true
                     */
                    setExpandedToDebugBtn(true);

                    /**
                     * Settiamo il flag globale che indica che la modale é stata appena aperta.
                     *
                     * - DebugTree usara questa informazione per non spostare il focus.
                     */
                    setSearchOverlayJustOpen();

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

                    /**
                     * Move focus to first area
                     */
                    MobCore.useFrameIndex(() => {
                        getRef().header.focus();
                    }, 10);

                    return;
                }

                unsubscribeEscHandler();
                unsubscribeTabHandler();

                /**
                 * Set toggle buttona arial label to false.
                 */
                setExpandedToDebugBtn(false);

                /**
                 * Resettiamo il flag globale che indica che la modale é stata appena aperta.
                 */
                resetSearchOverlayJustOpen();
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
             * Toggle List vs Tree
             */
            {
                content: [
                    {
                        tag: 'button',
                        className: 'list-toggle',
                        attributes: {
                            type: 'button',
                            'aria-label': 'Show component in tree view',
                            'aria-controls': 'debug-tree-list',
                        },
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
                                toggleAttribute: {
                                    'aria-expanded': () =>
                                        proxi.listType === DEBUG_USE_TREE
                                            ? 'true'
                                            : 'false',
                                },
                            }),
                        ],
                        content: 'Tree',
                    },
                    {
                        tag: 'button',
                        attributes: {
                            type: 'button',
                            'aria-label':
                                'Swow and filter component in plain list',
                            'aria-controls': 'filter-serach-list',
                        },
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
                                toggleAttribute: {
                                    'aria-expanded': () =>
                                        proxi.listType ===
                                        DEBUG_USE_FILTER_COMPONENT
                                            ? 'true'
                                            : 'false',
                                },
                            }),
                        ],
                        content: 'Filter',
                    },
                ],
            },

            /**
             * Right top header switch tree/list head
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
        attributes: {
            id: 'debug-dialog',
            'aria-label': 'Debug dialog',
            'aria-modal': 'true',
        },
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
                        attributes: {
                            tabindex: '-1',
                            role: 'region',
                            'aria-label': 'Infos and search',
                        },
                        modules: setRef('header'),
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
                        attributes: {
                            tabindex: '-1',
                            role: 'region',
                            'aria-label': 'component list',
                        },
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
