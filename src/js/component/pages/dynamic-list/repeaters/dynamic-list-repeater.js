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
 * @import {DynamicListCard} from "./card/type"
 * @import {DynamicListSlottedLabel} from "./slotted-label/type"
 * @import {DynamicListRepeater} from "./type"
 */

import { fromObject } from '@mobJs';

/**
 * @param {object} param
 * @param {StaticProps<DynamicListCard>} param.staticProps
 * @param {BindProps<DynamicListRepeater>} param.bindProps
 * @param {DelegateEvents} param.delegateEvents
 * @param {Current<DynamicListRepeater, 'data'>} param.current
 * @param {ProxiState<DynamicListRepeater>} param.proxi
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
                tag: 'dynamic-list-card',
                modules: [
                    staticProps(
                        /** @type {DynamicListCard['props']} */ ({
                            parentListId: proxi.listId,
                        })
                    ),
                    bindProps(
                        /** @returns {ReturnBindProps<DynamicListCard>} */
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
                    tag: 'dynamic-slotted-label',
                    attributes: { slot: 'card-label-slot' },
                    modules: bindProps(
                        /** @returns {ReturnBindProps<DynamicListSlottedLabel>} */
                        () => ({
                            label: `label: ${current.value.label} <br/> counter: ${proxi.counter}`,
                        })
                    ),
                },
            },
        ],
    });
}

/** @type {MobComponent<DynamicListRepeater>} */
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
