import { getIcons } from '@data/index';
import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';

let addToLinkedList = true;

/**
 * @import {
 *   BindEffect,
 *   DelegateEvents,
 *   Emit,
 *   MobComponent,
 *   ProxiState,
 *   ReturnBindProps
 * } from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {ProxiState<import('./type').CustomHistory>} params.proxi
 * @param {Emit<import('./type').CustomHistory>} params.emit
 */
const deleteNodes = ({ proxi, emit }) => {
    proxi.selectedNodes.forEach((id) => {
        let node = proxi.linkedList.find((node) => node.data.id === id);

        if (node) {
            proxi.linkedList = proxi.linkedList.removeNode(node);
            proxi.currentNode = null;
            emit(() => proxi.currentNode);
        }

        // @ts-ignore
        node = null;
    });

    proxi.selectedNodes.clear();
    emit(() => proxi.selectedNodes);
};

/**
 * @param {object} params
 * @param {ProxiState<import('./type').CustomHistory>} params.proxi
 * @param {Emit<import('./type').CustomHistory>} params.emit
 * @param {string} params.direction
 */
const moveNode = ({ proxi, emit, direction = 'up' }) => {
    proxi.selectedNodes.forEach((id) => {
        let node = proxi.linkedList.find((node) => node.data.id === id);

        if (node && direction === 'up' && node?.prev) {
            proxi.linkedList.moveBefore(node, node.prev);
        }

        if (node && direction === 'down' && node?.next) {
            proxi.linkedList.moveAfter(node, node.next);
        }

        // @ts-ignore
        node = null;
    });

    emit(() => proxi.linkedList);
};

/**
 * @param {object} params
 * @param {ProxiState<import('./type').CustomHistory>} params.proxi
 * @param {Emit<import('./type').CustomHistory>} params.emit
 */
const swapNode = ({ proxi, emit }) => {
    if (proxi.selectedNodes.size !== 2) return;
    const iterator = proxi.selectedNodes[Symbol.iterator]();
    const idA = iterator.next().value;
    const idB = iterator.next().value;
    let nodeA = proxi.linkedList.find((node) => node.data.id === idA);
    let nodeB = proxi.linkedList.find((node) => node.data.id === idB);

    if (!nodeA || !nodeB) return;

    proxi.linkedList.swap(nodeA, nodeB);
    emit(() => proxi.linkedList);
    // @ts-ignore
    nodeA = null;
    // @ts-ignore
    nodeB = null;
};

/**
 * @param {object} params
 * @param {ProxiState<import('./type').CustomHistory>} params.proxi
 * @param {DelegateEvents} params.delegateEvents
 * @param {BindEffect<import('./type').CustomHistory>} params.bindEffect
 * @param {Emit<import('./type').CustomHistory>} params.emit
 */
const getOptions = ({ proxi, delegateEvents, bindEffect, emit }) => {
    const removeIcon = getIcons()['close'];
    const previousIcon = getIcons()['previous'];
    const upIcon = getIcons()['up'];
    const swapIcon = getIcons()['swap'];
    const selectIcon = getIcons()['selectAll'];

    return html`
        <ul class="c-custom-history__nav">
            <li class="c-custom-history__prev">
                <button
                    type="button"
                    ${bindEffect({
                        toggleClass: {
                            active: () =>
                                !!(
                                    proxi.currentNode &&
                                    proxi.currentNode?.prev !== null
                                ),
                        },
                    })}
                    ${delegateEvents({
                        click: () => {
                            if (MobJs.mainStore.getProp('routeIsLoading'))
                                return;

                            if (proxi.currentNode?.prev) {
                                addToLinkedList = false;
                                proxi.currentNode = proxi.currentNode?.prev;
                            }
                        },
                    })}
                >
                    ${previousIcon}
                </button>
            </li>
            <li class="c-custom-history__next">
                <button
                    type="button"
                    ${bindEffect({
                        toggleClass: {
                            active: () =>
                                !!(
                                    proxi.currentNode &&
                                    proxi.currentNode?.next !== null
                                ),
                        },
                    })}
                    ${delegateEvents({
                        click: () => {
                            if (MobJs.mainStore.getProp('routeIsLoading'))
                                return;

                            if (proxi.currentNode?.next) {
                                addToLinkedList = false;
                                proxi.currentNode = proxi.currentNode?.next;
                            }
                        },
                    })}
                >
                    ${previousIcon}
                </button>
            </li>
            <li class="c-custom-history__remove">
                <button
                    type="button"
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.selectedNodes.size > 0,
                        },
                    })}
                    ${delegateEvents({
                        click: () => {
                            deleteNodes({ proxi, emit });
                            proxi.selectAllOn = false;
                        },
                    })}
                >
                    ${removeIcon}
                </button>
            </li>
            <li class="c-custom-history__up">
                <button
                    type="button"
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.selectedNodes.size === 1,
                        },
                    })}
                    ${delegateEvents({
                        click: () => {
                            moveNode({ emit, proxi, direction: 'up' });
                        },
                    })}
                >
                    ${upIcon}
                </button>
            </li>
            <li class="c-custom-history__down">
                <button
                    type="button"
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.selectedNodes.size === 1,
                        },
                    })}
                    ${delegateEvents({
                        click: () => {
                            moveNode({ emit, proxi, direction: 'down' });
                        },
                    })}
                >
                    ${upIcon}
                </button>
            </li>
            <li class="c-custom-history__swap">
                <button
                    type="button"
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.selectedNodes.size === 2,
                        },
                    })}
                    ${delegateEvents({
                        click: () => {
                            swapNode({ proxi, emit });
                        },
                    })}
                >
                    ${swapIcon}
                </button>
            </li>
            <li class="c-custom-history__select-all">
                <button
                    type="button"
                    ${bindEffect({
                        toggleClass: {
                            active: () => proxi.linkedList.size > 0,
                            'should-add': () => proxi.selectAllOn,
                        },
                    })}
                    ${delegateEvents({
                        click: () => {
                            proxi.selectAllOn = !proxi.selectAllOn;
                        },
                    })}
                >
                    ${selectIcon}
                </button>
            </li>
        </ul>
    `;
};

/** @type {MobComponent<import('./type').CustomHistory>} */
export const CustomHistoryFn = ({
    getProxi,
    computed,
    repeat,
    bindEffect,
    addMethod,
    staticProps,
    delegateEvents,
    bindProps,
    watch,
    emit,
}) => {
    const proxi = getProxi();

    /**
     * Load route on current Node change
     */
    watch(
        () => proxi.currentNode,
        (node) => {
            MobJs.loadUrl({
                url: node?.data.url,
                params: node?.data?.params,
                skipTransition: true,
            });
        }
    );

    /**
     * Transform linked-list in array
     */
    computed(
        () => proxi.listParsed,
        () => proxi.linkedList.toArray()
    );

    /**
     * Open/Close history panel
     */
    addMethod('toggle', () => {
        proxi.active = !proxi.active;
    });

    /**
     * Set current node without add to linkd-list
     */
    addMethod('addRouteWithoutUpdate', ({ id }) => {
        proxi.currentNode = proxi.linkedList.find(
            (node) => node.data.id === id
        );

        addToLinkedList = false;
        proxi.active = false;
    });

    /**
     * Set current node without add to linkd-list
     */
    addMethod('addSelectedNodes', ({ id, add }) => {
        /**
         * Delete return boolean so delete should not be used directly
         *
         * - So update and emit.
         */
        if (add) {
            proxi.selectedNodes.add(id);
        } else {
            proxi.selectedNodes.delete(id);
        }

        emit(() => proxi.selectedNodes);
    });

    /**
     * Add new route to linked list
     */
    MobJs.afterRouteChange(() => {
        const currentParams = MobJs.getActiveParams();
        const currentHash = MobJs.getActiveRoute()?.route;

        /**
         * New route load outside History
         */
        if (addToLinkedList && currentHash !== proxi.currentNode?.data.url) {
            /**
             * Max X item, if e selected item is first node remove from selectedNodes set.
             */
            if (proxi.linkedList.size >= 20) {
                let firstNode = proxi.linkedList.first;

                if (firstNode) {
                    proxi.selectedNodes.delete(firstNode.data.id);
                    emit(() => proxi.selectedNodes);
                }

                proxi.linkedList.removeFirst();
                firstNode = null;
            }

            /**
             * If we have a current node ( es: middle of list ) insert after.
             */
            if (proxi.currentNode) {
                proxi.linkedList = proxi.linkedList.insertAfter(
                    proxi.currentNode,
                    {
                        id: MobCore.getUnivoqueId(),
                        url: currentHash,
                        params: currentParams,
                    }
                );

                proxi.currentNode = proxi.currentNode.next;
            }

            /**
             * If we don't have a current node insert last
             */
            if (!proxi.currentNode) {
                proxi.linkedList = proxi.linkedList.addLast({
                    id: MobCore.getUnivoqueId(),
                    url: currentHash,
                    params: currentParams,
                });

                proxi.currentNode = proxi.linkedList.last;
            }
        }

        addToLinkedList = true;
    });

    return html`
        <div
            class="c-custom-history"
            ${bindEffect({
                toggleClass: {
                    active: () => proxi.active,
                },
            })}
        >
            <div class="custom-history__head">
                <h5>Custom history navigation ( max 20 )</h5>
            </div>
            <button
                class="c-custom-history__close"
                ${delegateEvents({
                    click: () => (proxi.active = false),
                })}
            ></button>
            ${getOptions({ proxi, delegateEvents, bindEffect, emit })}
            <div class="c-custom-history__container">
                ${repeat({
                    observe: () => proxi.listParsed,
                    key: 'id',
                    render: ({ current }) => {
                        return html`<history-item
                            ${staticProps(
                                /** @type {import('./history-item/type').HistoryItem['props']} */
                                ({
                                    id: current.value.id,
                                    url: current.value.url,
                                })
                            )}
                            ${bindProps(
                                () =>
                                    /** @type {ReturnBindProps<import('./history-item/type').HistoryItem>} */
                                    ({
                                        active:
                                            proxi.currentNode?.data.id ===
                                            current.value.id,
                                        forceSelect: proxi.selectAllOn,
                                    })
                            )}
                        ></history-item>`;
                    },
                })}
            </div>
        </div>
    `;
};
