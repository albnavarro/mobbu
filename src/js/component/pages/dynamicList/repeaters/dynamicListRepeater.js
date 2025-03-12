//@ts-check

/**
 * @import { Current, MobComponent, ReturnBindProps } from '../../../../mobjs/type';
 * @import { StaticProps, BindProps, DelegateEvents } from '../../../../mobjs/type';
 * @import { DynamicListCard } from '../card/type';
 * @import { DynamicListRepeater } from './type';
 **/

import { html } from '../../../../mobjs';

/**
 * @param {object} param
 * @param {StaticProps<DynamicListCard>} param.staticProps
 * @param {BindProps<DynamicListRepeater>} param.bindProps
 * @param {number} param.listId
 * @param {DelegateEvents} param.delegateEvents
 * @param {Current<DynamicListRepeater,'data'>} param.current
 *
 */
function getRepeaterCard({
    staticProps,
    bindProps,
    listId,
    delegateEvents,
    current,
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
                    props: ({ counter }) => {
                        return {
                            counter,
                            label: current.value.label,
                            index: current.index,
                        };
                    },
                })}
                ${delegateEvents({
                    click: () => {
                        console.log(current.value?.label, current.index);
                    },
                })}
            >
                <dynamic-slotted-label
                    slot="card-label-slot"
                    ${bindProps({
                        bind: ['counter'],
                        /** @returns {ReturnBindProps<import('../slottedLabel/type').DynamicListSlottedLabel>} */
                        props: ({ counter }) => {
                            return {
                                label: `label: ${current.value.label} <br/> counter: ${counter}`,
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
                    render: ({ current }) => {
                        return getRepeaterCard({
                            staticProps,
                            bindProps,
                            delegateEvents,
                            listId,
                            current,
                        });
                    },
                })}
            </div>
        </div>
    `;
};
