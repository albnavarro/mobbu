// @ts-check

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 **/

import { consoleLogDebug } from '../consoleLog';
import { DEBUG_USE_FILTER_COMPONENT, DEBUG_USE_TREE } from './constant';

/** @type{MobComponent<import('./type').DebugOverlay>} */
export const DebugOverlayFn = ({
    html,
    delegateEvents,
    addMethod,
    updateState,
    setState,
    bindProps,
    invalidate,
    getState,
    bindEffect,
}) => {
    addMethod('toggle', () => {
        updateState('active', (value) => !value);
    });

    return html`<div
        class="c-debug-overlay"
        ${bindEffect({
            bind: 'active',
            toggleClass: { active: () => getState().active },
        })}
    >
        <button
            class="c-debug-overlay__background"
            type="button"
            ${delegateEvents({
                click: () => {
                    setState('active', false);
                },
            })}
        ></button>
        <button
            type="button"
            class="c-debug-overlay__close"
            ${delegateEvents({
                click: () => {
                    setState('active', false);
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
                    ${bindProps({
                        bind: ['active'],
                        /** @returns{ReturnBindProps<import('./Debughead/type').DebugHead>} */
                        props: ({ active }) => {
                            return {
                                active,
                            };
                        },
                    })}
                ></debug-head>
            </div>
            <div class="c-debug-overlay__list">
                <div class="c-debug-overlay__list__header">
                    <div>
                        ${invalidate({
                            bind: ['listType', 'active'],
                            persistent: true,
                            render: ({ html }) => {
                                const { listType, active } = getState();

                                if (listType === DEBUG_USE_TREE && active)
                                    return html`<div
                                        class="c-debug-overlay__list__title"
                                    >
                                        Tree structure
                                    </div>`;

                                if (
                                    listType === DEBUG_USE_FILTER_COMPONENT &&
                                    active
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
                                    setState('listType', DEBUG_USE_TREE);
                                },
                            })}
                            ${bindEffect({
                                bind: 'listType',
                                toggleClass: {
                                    active: () =>
                                        getState().listType === DEBUG_USE_TREE,
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
                                    setState(
                                        'listType',
                                        DEBUG_USE_FILTER_COMPONENT
                                    );
                                },
                            })}
                            ${bindEffect({
                                bind: 'listType',
                                toggleClass: {
                                    active: () =>
                                        getState().listType ===
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
                        persistent: true,
                        render: ({ html }) => {
                            const { listType, active } = getState();

                            if (listType === DEBUG_USE_TREE && active)
                                return html`
                                    <debug-tree name="debug_tree"></debug-tree>
                                `;

                            if (
                                listType === DEBUG_USE_FILTER_COMPONENT &&
                                active
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
