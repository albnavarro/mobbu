//@ts-check

/**
 * @import { MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 * @import { StaticProps, GetState, BindProps, DelegateEvents } from '../../../../mobjs/type';
 * @import { DynamicListCard } from '../card/type';
 * @import { DynamicListRepeater } from './type';
 **/

import { html } from '../../../../mobjs';

/**
 * @param {object} param
 * @param {StaticProps<DynamicListCard>} param.staticProps
 * @param {GetState<DynamicListRepeater>} param.getState
 * @param {BindProps<DynamicListRepeater>} param.bindProps
 * @param {number} param.listId
 * @param {DelegateEvents} param.delegateEvents
 */
function getRepeaterCard({
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
                    /** @returns {ReturnBindProps<DynamicListCard>} */
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
            >
                <dynamic-slotted-label
                    slot="card-label-slot"
                    ${bindProps({
                        bind: ['counter'],
                        /** @returns {ReturnBindProps<import('../slottedLabel/type').DynamicListSlottedLabel>} */
                        props: ({ data, counter }, index) => {
                            return {
                                label: `label: ${data[index].label} <br/> counter: ${counter}`,
                            };
                        },
                    })}
                >
                </dynamic-slotted-label>
            </dynamic-list-card>
        </div>
    `;
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
            <div class="c-dynamic-list-repeater__list">
                ${repeat({
                    bind: 'data',
                    clean,
                    key: keyParsed,
                    afterUpdate: () => {
                        console.log('repeater updated');
                    },
                    render: () => {
                        return getRepeaterCard({
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
