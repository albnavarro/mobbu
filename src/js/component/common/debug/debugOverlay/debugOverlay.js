// @ts-check

import { html, MobJs } from '@mobJs';
import { consoleLogDebug } from '../consoleLog';
import { DEBUG_USE_FILTER_COMPONENT, DEBUG_USE_TREE } from './constant';

/**
 * @import { MobComponent, ReturnBindProps } from '@mobJsType';
 * @import { DebugHead } from './Debughead/type';
 **/

/** @type{MobComponent<import('./type').DebugOverlay>} */
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
         * Close overlay on route change.
         * Avoid infinite debuf overlay filter item increase.
         * If filter list is visible avoid to count them.
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
            class="c-debug-overlay__background"
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
            class="c-debug-overlay__close"
            ${delegateEvents({
                click: () => {
                    proxi.active = false;
                    proxi.listType = DEBUG_USE_TREE;
                },
            })}
        ></button>
        <div class="c-debug-overlay__grid">
            <button
                type="button"
                class="c-debug-overlay__log"
                ${delegateEvents({
                    click: () => {
                        consoleLogDebug();
                    },
                })}
            >
                console log
            </button>

            <div class="c-debug-overlay__head">
                <debug-head
                    ${bindProps(
                        /** @returns{ReturnBindProps<DebugHead>} */
                        () => ({
                            active: proxi.active,
                        })
                    )}
                ></debug-head>
            </div>
            <div class="c-debug-overlay__list">
                <div class="c-debug-overlay__list__header">
                    <div>
                        ${invalidate({
                            bind: ['listType', 'active'],
                            render: () => {
                                if (
                                    proxi.listType === DEBUG_USE_TREE &&
                                    proxi.active
                                )
                                    return html`<div
                                        class="c-debug-overlay__list__title"
                                    >
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

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
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
                            class="c-debug-overlay__list__toggle"
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
                        bind: ['listType', 'active'],
                        render: () => {
                            if (
                                proxi.listType === DEBUG_USE_TREE &&
                                proxi.active
                            )
                                return html`
                                    <debug-tree name="debug_tree"></debug-tree>
                                `;

                            if (
                                proxi.listType === DEBUG_USE_FILTER_COMPONENT &&
                                proxi.active
                            )
                                return html`
                                    <debug-filter-list
                                        name="debug_filter_list"
                                    ></debug-filter-list>
                                `;

                            return '';
                        },
                    })}
                </div>
            </div>
            <div class="c-debug-overlay__component">
                <debug-component name="debug_component"></debug-component>
            </div>
        </div>
    </div>`;
};
