// @ts-check

import { html, MobJs } from '@mobJs';
import { consoleLogDebug } from '../console-log';
import { DEBUG_USE_FILTER_COMPONENT, DEBUG_USE_TREE } from './constant';
import {
    debugComponentName,
    debugFilterListName,
    debugTreeName,
} from '@instanceName';

/**
 * @import {
 *   MobComponent,
 *   ReturnBindProps
 * } from "@mobJsType"
 * @import {DebugHead} from "./head/type"
 */

/** @type {MobComponent<import('./type').DebugOverlay>} */
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

    return html`<div
        class="c-debug-overlay"
        ${bindEffect({
            toggleClass: { active: () => proxi.active },
        })}
    >
        <button
            class="background"
            type="button"
            ${delegateEvents({
                click: () => {
                    proxi.active = false;
                    proxi.listType = DEBUG_USE_TREE;
                },
            })}
        ></button>
        <button
            type="button"
            class="close"
            ${delegateEvents({
                click: () => {
                    proxi.active = false;
                    proxi.listType = DEBUG_USE_TREE;
                },
            })}
        ></button>
        <div class="grid">
            <button
                type="button"
                class="log"
                ${delegateEvents({
                    click: () => {
                        consoleLogDebug();
                    },
                })}
            >
                console log
            </button>

            <div class="header">
                <debug-head
                    ${bindProps(
                        /** @returns {ReturnBindProps<DebugHead>} */
                        () => ({
                            active: proxi.active,
                        })
                    )}
                ></debug-head>
            </div>
            <div class="list">
                <div class="list-header">
                    <div>
                        ${invalidate({
                            observe: [() => proxi.listType, () => proxi.active],
                            render: () => {
                                if (
                                    proxi.listType === DEBUG_USE_TREE &&
                                    proxi.active
                                )
                                    return html`<div class="list-title">
                                        Tree structure
                                    </div>`;

                                if (
                                    proxi.listType ===
                                        DEBUG_USE_FILTER_COMPONENT &&
                                    proxi.active
                                )
                                    return html`<debug-filter-head></debug-filter-head>`;

                                // Remove component
                                return '';
                            },
                        })}
                    </div>

                    <div>
                        <button
                            type="button"
                            class="list-toggle"
                            ${delegateEvents({
                                click: () => {
                                    proxi.listType = DEBUG_USE_TREE;
                                },
                            })}
                            ${bindEffect({
                                toggleClass: {
                                    active: () =>
                                        proxi.listType === DEBUG_USE_TREE,
                                },
                            })}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="list-toggle"
                            ${delegateEvents({
                                click: () => {
                                    proxi.listType = DEBUG_USE_FILTER_COMPONENT;
                                },
                            })}
                            ${bindEffect({
                                toggleClass: {
                                    active: () =>
                                        proxi.listType ===
                                        DEBUG_USE_FILTER_COMPONENT,
                                },
                            })}
                        >
                            Filter
                        </button>
                    </div>
                </div>
                <div>
                    ${invalidate({
                        observe: [() => proxi.listType, () => proxi.active],
                        render: () => {
                            if (
                                proxi.listType === DEBUG_USE_TREE &&
                                proxi.active
                            )
                                return html`
                                    <debug-tree
                                        name="${debugTreeName}"
                                    ></debug-tree>
                                `;

                            if (
                                proxi.listType === DEBUG_USE_FILTER_COMPONENT &&
                                proxi.active
                            )
                                return html`
                                    <debug-filter-list
                                        name="${debugFilterListName}"
                                    ></debug-filter-list>
                                `;

                            return '';
                        },
                    })}
                </div>
            </div>
            <div class="single-component">
                <debug-component name="${debugComponentName}"></debug-component>
            </div>
        </div>
    </div>`;
};
