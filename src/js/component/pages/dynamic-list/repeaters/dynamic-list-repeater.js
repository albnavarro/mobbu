//@ts-check

/**
 * @import {Current, MobComponent, ReturnBindProps, StaticProps, BindProps, DelegateEvents} from '@mobJsType';
 * @import {DynamicListCard} from '../card/type';
 * @import {DynamicListRepeater} from './type';
 * @import {DynamicListSlottedLabel} from '../slotted-label/type';
 */

import { html } from '@mobJs';

/**
 * @param {object} param
 * @param {StaticProps<DynamicListCard>} param.staticProps
 * @param {BindProps<DynamicListRepeater>} param.bindProps
 * @param {DelegateEvents} param.delegateEvents
 * @param {Current<DynamicListRepeater, 'data'>} param.current
 * @param {DynamicListRepeater['state']} param.proxi
 */
function getRepeaterCard({
    staticProps,
    bindProps,
    delegateEvents,
    current,
    proxi,
}) {
    return html`
        <div class="c-dynamic-list-repeater__item">
            <dynamic-list-card
                ${staticProps(
                    /** @type {DynamicListCard['state']} */ ({
                        parentListId: proxi.listId,
                    })
                )}
                ${bindProps(
                    /** @returns {ReturnBindProps<DynamicListCard>} */
                    () => ({
                        counter: proxi.counter,
                        label: current.value.label,
                        index: current.index,
                    })
                )}
                ${delegateEvents({
                    click: () => {
                        console.log(current.value?.label, current.index);
                    },
                })}
            >
                <dynamic-slotted-label
                    slot="card-label-slot"
                    ${bindProps(
                        /** @returns {ReturnBindProps<DynamicListSlottedLabel>} */
                        () => ({
                            label: `label: ${current.value.label} <br/> counter: ${proxi.counter}`,
                        })
                    )}
                >
                </dynamic-slotted-label>
            </dynamic-list-card>
        </div>
    `;
}

/** @type {MobComponent<DynamicListRepeater>} */
export const DynamicListRepeaterFn = ({
    staticProps,
    bindProps,
    delegateEvents,
    repeat,
    getProxi,
    computed,
}) => {
    const proxi = getProxi();
    const keyParsed = proxi.key.length > 0 ? proxi.key : undefined;

    computed(
        () => proxi.dataUnique,
        () =>
            proxi.data.filter(
                (value, index, self) =>
                    self.map(({ key }) => key).indexOf(value.key) === index
            )
    );

    return html`
        <div class="c-dynamic-list-repeater">
            <h4 class="c-dynamic-list-repeater__title">${proxi.label}</h4>
            <div class="c-dynamic-list-repeater__list">
                ${repeat({
                    bind: () => (keyParsed ? proxi.dataUnique : proxi.data),
                    clean: proxi.clean,
                    key: keyParsed,
                    afterUpdate: () => {
                        console.log('repeater updated');
                    },
                    render: ({ current }) => {
                        return getRepeaterCard({
                            staticProps,
                            bindProps,
                            delegateEvents,
                            current,
                            proxi,
                        });
                    },
                })}
            </div>
        </div>
    `;
};
