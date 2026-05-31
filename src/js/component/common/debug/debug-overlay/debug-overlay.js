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
import { MobCore } from '@mobCore';
import { resetSearchOverlayJustOpen, setSearchOverlayJustOpen } from './utils';

/**
 * @import {
 *   GetRef,
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
const onCalcelHandler = ({ proxi }) => {
    return function onCancel() {
        proxi.active = false;
        document.body.style.overflow = '';
        resetSearchOverlayJustOpen();
    };
};

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').DebugOverlayType>} params.proxi
 * @param {GetRef<import('./type').DebugOverlayType>} params.getRef
 */
function backDropHandler({ proxi, getRef }) {
    return function onBackDrop(/** @type {MouseEvent} */ event) {
        if (event.target === getRef().dialog) {
            closeOverlay({ getRef, proxi });
        }
    };
}

/**
 * @param {object} params
 * @param {ProxiSelfState<import('./type').DebugOverlayType>} params.proxi
 * @param {GetRef<import('./type').DebugOverlayType>} params.getRef
 */
const closeOverlay = ({ proxi, getRef }) => {
    proxi.active = false;
    getRef().dialog.close();
    document.body.style.overflow = '';
    resetSearchOverlayJustOpen();
};

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

        getRef().dialog.showModal();
        document.body.style.overflow = 'hidden';
        setSearchOverlayJustOpen();

        /**
         * Move focus to first area
         */
        MobCore.useFrameIndex(() => {
            getRef().header.focus();
        }, 10);
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

    onMount(() => {
        /**
         * Close overlay on route change. Avoid infinite debuf overlay filter item increase. If filter list is visible
         * avoid to count them.
         */
        const unsubScribeBeforeRouterChange = MobJs.beforeRouteChange(() => {
            closeOverlay({ proxi, getRef });
            proxi.listType = DEBUG_USE_TREE;
        });

        const onCancelSubscriber = onCalcelHandler({ proxi });
        getRef().dialog.addEventListener('cancel', onCancelSubscriber);

        const onBackDropSubscriber = backDropHandler({ proxi, getRef });
        getRef().dialog.addEventListener('click', onBackDropSubscriber);

        return () => {
            unsubScribeBeforeRouterChange();
            getRef().dialog.removeEventListener('cancel', onCancelSubscriber);
            getRef().dialog.removeEventListener('click', onBackDropSubscriber);
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
        attributes: { id: 'debug-dialog', 'aria-label': 'Debug dialog' },
        modules: setRef('dialog'),
        content: [
            {
                className: 'grid',
                content: [
                    {
                        tag: 'h2',
                        className: 'main-title',
                        content: 'Debug application',
                    },
                    /**
                     * Top header
                     */
                    {
                        className: 'header',
                        attributes: {
                            tabindex: '-1',
                            role: 'region',
                            'aria-label':
                                'Debug Dialog: infos & specific component search',
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
                        closeOverlay({ proxi, getRef });
                        proxi.listType = DEBUG_USE_TREE;
                    },
                }),
            },
        ],
    });
};
