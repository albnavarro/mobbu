/**
 * @import {MobComponent} from "@mobJsType"
 */

import { updateDebugComponentById } from '@commonComponent/debug/debug-overlay/debug-component/utils';
import { htmlObject } from '@mobJs';

/** @type {MobComponent<import('./type').DebugFilterListItemType>} */
export const DebugFilterListItemFn = ({
    delegateEvents,
    bindText,
    bindEffect,
    getProxi,
    computed,
}) => {
    const proxi = getProxi();

    computed(
        () => proxi.active,
        () => proxi.id === proxi.currentId
    );

    return htmlObject({
        className: 'c-debug-filter-list-item',
        content: [
            {
                tag: 'span',
                className: 'id',
                content: proxi.id,
            },
            '|',
            {
                tag: 'span',
                className: 'tag',
                content: bindText`${'tag'}`,
            },
            '|',
            {
                tag: 'span',
                className: 'name',
                content: proxi.name,
            },
            {
                tag: 'button',
                attributes: { type: 'button' },
                className: 'expand',
                modules: delegateEvents({
                    click: () => {
                        updateDebugComponentById(proxi.id);
                    },
                }),
                content: 'detail',
            },
            {
                tag: 'span',
                className: 'selected',
                modules: bindEffect({
                    toggleClass: { active: () => proxi.active },
                }),
            },
        ],
    });
};
