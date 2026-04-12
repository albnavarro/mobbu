/**
 * @import {
 *   BindProps,
 *   Current,
 *   DelegateEvents,
 *   MobComponent,
 *   ProxiState,
 *   ReturnBindProps,
 *   StaticProps
 * } from "@mobJsType"
 * @import {DynamicListCardType} from "./card/type"
 * @import {DynamicListSlottedLabelType} from "./slotted-label/type"
 * @import {DynamicListRepeaterType} from "./type"
 */

import { fromObject } from '@mobJs';
import { DynamicListCard } from './card/definition';
import { DynamicListSlottedLabel } from './slotted-label/definition';

/**
 * @param {object} param
 * @param {StaticProps<DynamicListCardType>} param.staticProps
 * @param {BindProps<DynamicListRepeaterType>} param.bindProps
 * @param {DelegateEvents} param.delegateEvents
 * @param {Current<DynamicListRepeaterType, 'data'>} param.current
 * @param {ProxiState<DynamicListRepeaterType>} param.proxi
 */
function getRepeaterCard({
    staticProps,
    bindProps,
    delegateEvents,
    current,
    proxi,
}) {
    return fromObject({
        content: [
            {
                component: DynamicListCard,
                modules: [
                    staticProps(
                        /** @type {DynamicListCardType['props']} */ ({
                            parentListId: proxi.listId,
                        })
                    ),
                    bindProps(
                        /** @returns {ReturnBindProps<DynamicListCardType>} */
                        () => ({
                            counter: proxi.counter,
                            label: current.value.label,
                            index: current.index,
                        })
                    ),
                    delegateEvents({
                        click: () => {
                            console.log(current.value?.label, current.index);
                        },
                    }),
                ],
                content: {
                    component: DynamicListSlottedLabel,
                    attributes: { slot: 'card-label-slot' },
                    modules: bindProps(
                        /** @returns {ReturnBindProps<DynamicListSlottedLabelType>} */
                        () => ({
                            label: `label: ${current.value.label} <br/> counter: ${proxi.counter}`,
                        })
                    ),
                },
            },
        ],
    });
}

/** @type {MobComponent<DynamicListRepeaterType>} */
export const DynamicListRepeaterFn = ({
    staticProps,
    bindProps,
    delegateEvents,
    repeat,
    getProxi,
}) => {
    const proxi = getProxi();
    const keyParsed = proxi.key.length > 0 ? proxi.key : undefined;

    return fromObject({
        className: 'c-dynamic-list-repeater',
        content: [
            {
                tag: 'h4',
                className: 'repeater-title',
                content: proxi.label,
            },
            {
                className: 'repeater-list',
                content: repeat({
                    observe: () => proxi.data,
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
                }),
            },
        ],
    });
};
