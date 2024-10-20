//@ts-check

/**
 * @import { MobComponent } from '../../../../mobjs/type';
 * @import { StaticProps, GetState, BindProps, DelegateEvents } from '../../../../mobjs/type';
 * @import { DynamicListCard } from '../card/type';
 * @import { DynamicListRepeater } from './type';
 **/

import { html } from '../../../../mobjs';

/**
 * @param {object} param
 * @param {() => string} param.sync
 * @param {StaticProps<DynamicListCard>} param.staticProps
 * @param {GetState<DynamicListRepeater>} param.getState
 * @param {BindProps<DynamicListRepeater>} param.bindProps
 * @param {number} param.listId
 * @param {DelegateEvents} param.delegateEvents
 */
function getRepeaterCard({
    sync,
    staticProps,
    bindProps,
    listId,
    delegateEvents,
    getState,
}) {
    return html`
        <div class="c-dynamic-list-repeater__item">
            <dynamic-list-card
                ${staticProps({
                    parentListId: listId,
                })}
                ${bindProps({
                    bind: ['counter'],
                    /** @returns {Partial<import('../card/type').DynamicListCard>} */
                    props: ({ counter, data }, index) => {
                        return {
                            counter,
                            label: data[index].label,
                            index: index,
                        };
                    },
                })}
                ${delegateEvents({
                    click: (_e, index) => {
                        const { data } = getState();
                        const current = data[index].label;

                        console.log(current, index);
                    },
                })}
                ${sync()}
            >
                <dynamic-slotted-label
                    slot="card-label-slot"
                    ${bindProps({
                        bind: ['counter'],
                        /** @returns {Partial<import('../slottedLabel/type').DynamicListSlottedLabel>} */
                        props: ({ data, counter }, index) => {
                            return {
                                label: `label: ${data[index].label} <br/> counter: ${counter}`,
                            };
                        },
                    })}
                    ${sync()}
                >
                </dynamic-slotted-label>
            </dynamic-list-card>
        </div>
    `;
}

/** @param {string[]} id **/
function updateNewElement(id) {
    return `<strong>Current cards id:</strong> ${id
        .join(',')
        // @ts-ignore
        .replaceAll(',', ' | ')}`;
}

/**
 * @param {object} params
 * @param {HTMLElement} params.element
 * @param {string} params.className
 * @param {string[]} params.childrenId
 **/
function afterUpdateList({ element, className, childrenId }) {
    const newElement = element.querySelector(className);
    if (!newElement) return;

    newElement.textContent = '';
    newElement.insertAdjacentHTML('afterbegin', updateNewElement(childrenId));
}

/** @type {MobComponent<DynamicListRepeater>} */
export const DynamicListRepeaterFn = ({
    getState,
    html,
    staticProps,
    bindProps,
    delegateEvents,
    repeat,
}) => {
    const { listId, key, clean, label } = getState();
    const keyParsed = key.length > 0 ? key : undefined;

    return html`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${label}</h4>
            <p class="c-dynamic-list-repeater__new js-list"></p>
            <div class="c-dynamic-list-repeater__list">
                ${repeat({
                    bind: 'data',
                    clean,
                    key: keyParsed,
                    afterUpdate: ({ childrenId, element }) => {
                        afterUpdateList({
                            className: `.js-list`,
                            childrenId,
                            element,
                        });
                    },
                    render: ({ sync }) => {
                        return getRepeaterCard({
                            sync,
                            staticProps,
                            getState,
                            bindProps,
                            delegateEvents,
                            listId,
                        });
                    },
                })}
            </div>
        </div>
    `;
};
