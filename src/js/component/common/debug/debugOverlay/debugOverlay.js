// @ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 **/

import { DEBUG_USE_FILTER_COMPONENT, DEBUG_USE_TREE } from './constant';

/** @type{MobComponent<import('./type').DebugOverlay>} */
export const DebugOverlayFn = ({
    html,
    delegateEvents,
    addMethod,
    onMount,
    updateState,
    watchSync,
    setState,
    bindProps,
    invalidate,
    getState,
    setRef,
    getRef,
}) => {
    addMethod('toggle', () => {
        updateState('active', (value) => !value);
    });

    onMount(({ element }) => {
        const { toggle_tree, toggle_filter } = getRef();

        watchSync('active', (value) => {
            element.classList.toggle('active', value);
        });

        watchSync('listType', (value) => {
            const isTree = value === DEBUG_USE_TREE;
            toggle_tree.classList.toggle('active', isTree);
            toggle_filter.classList.toggle('active', !isTree);
        });

        return () => {};
    });

    return html`<div class="c-debug-overlay">
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
            <div class="c-debug-overlay__head">
                <debug-head
                    ${bindProps({
                        bind: ['active'],
                        /** @returns{import('./Debughead/type').DebugHead} */
                        props: ({ active }) => {
                            return {
                                active: active,
                            };
                        },
                    })}
                ></debug-head>
            </div>
            <div class="c-debug-overlay__list">
                <div class="c-debug-overlay__list__header">
                    <div>
                        ${invalidate({
                            bind: ['listType'],
                            persistent: true,
                            render: ({ html }) => {
                                const { listType } = getState();

                                return listType === DEBUG_USE_TREE
                                    ? html`<div
                                          class="c-debug-overlay__list__title"
                                      >
                                          Tree structure
                                      </div>`
                                    : html`<debug-filter-head></debug-filter-head>`;
                            },
                        })}
                    </div>

                    <div class="c-debug-overlay__list__ctas">
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${setRef('toggle_tree')}
                            ${delegateEvents({
                                click: () => {
                                    setState('listType', DEBUG_USE_TREE);
                                },
                            })}
                        >
                            Tree
                        </button>
                        <button
                            type="button"
                            class="c-debug-overlay__list__toggle"
                            ${setRef('toggle_filter')}
                            ${delegateEvents({
                                click: () => {
                                    setState(
                                        'listType',
                                        DEBUG_USE_FILTER_COMPONENT
                                    );
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

                            return listType === DEBUG_USE_TREE && active
                                ? html`
                                      <debug-tree
                                          name="debug_tree"
                                      ></debug-tree>
                                  `
                                : '';
                        },
                    })}
                </div>
                <div>
                    ${invalidate({
                        bind: ['listType', 'active'],
                        persistent: true,
                        render: ({ html }) => {
                            const { listType, active } = getState();

                            return listType === DEBUG_USE_FILTER_COMPONENT &&
                                active
                                ? html` <div>filter</div> `
                                : '';
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
