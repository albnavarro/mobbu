import { MobCore } from '@mobCore';
import { html, MobJs } from '@mobJs';

let addToLinkedList = true;

/**
 * @import {
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState,
 *   ReturnBindProps
 * } from "@mobJsType"
 */

/**
 * @param {object} params
 * @param {ProxiState<import('./type').CustomHistory>} params.proxi
 * @param {DelegateEvents} params.delegateEvents
 */
const getOptions = ({ proxi, delegateEvents }) => {
    return html`
        <ul class="c-custom-history__nav">
            <li class="c-custom-history__prev">
                <button
                    type="button"
                    ${delegateEvents({
                        click: () => {
                            if (proxi.currentNode?.prev) {
                                addToLinkedList = false;
                                proxi.currentNode = proxi.currentNode?.prev;
                            }
                        },
                    })}
                >
                    prev
                </button>
            </li>
            <li class="c-custom-history__prev">
                <button
                    type="button"
                    ${delegateEvents({
                        click: () => {
                            if (proxi.currentNode?.next) {
                                addToLinkedList = false;
                                proxi.currentNode = proxi.currentNode?.next;
                            }
                        },
                    })}
                >
                    next
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
}) => {
    const proxi = getProxi();

    /**
     * Load route on current Node change
     */
    watch(
        () => proxi.currentNode,
        (node) => {
            MobJs.loadUrl({ url: node?.data.url, params: node?.data?.params });
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
            if (proxi.linkedList.size >= 20) proxi.linkedList.removeFirst();

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
            <button
                class="c-custom-history__close"
                ${delegateEvents({
                    click: () => (proxi.active = false),
                })}
            ></button>
            ${getOptions({ proxi, delegateEvents })}
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
                                    })
                            )}
                        ></history-item>`;
                    },
                })}
            </div>
        </div>
    `;
};
