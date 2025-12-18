import { MobJs } from '@mobJs';
import { CustomHistoryFn } from './custom-history';
import { LinkedList } from 'src/js/mob/mob-core/data-set/linked-list';
import { HistoryItem } from './history-item/definition';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const CustomHistory = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').CustomHistory>} */
    ({
        tag: 'custom-history',
        component: CustomHistoryFn,
        state: {
            linkedList: () => ({
                value: new LinkedList(),
                type: 'any',
                skipEqual: false,
            }),
            listParsed: () => ({
                value: [],
                type: Array,
                skipEqual: false,
            }),
            currentNode: () => ({
                value: undefined,
                type: 'any',
                skipEqual: false,
            }),
            selectedNodes: () => ({
                value: new Set(),
                type: Set,
                skipEqual: false,
            }),
            active: () => ({
                value: false,
                type: Boolean,
            }),
            selectAllOn: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [HistoryItem],
    })
);
