//@ts-check

import { createComponent } from '../../../../mobjs';
import { DynamicListButton } from '../button/definition';
import { DynamicCounter } from '../counter/definition';
import { innerData } from '../data';
import { DynamicListEmpty } from '../empty/definition';
import { DynamicListCardFn } from './dynamicListCard';
import { DynamicListCardInner } from './innerCard/definition';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const DynamicListCard = createComponent(
    /** @type{CreateComponentParams<import('./type').DynamicListCard>} */
    ({
        name: 'dynamic-list-card',
        component: DynamicListCardFn,
        exportState: ['isFull', 'label', 'index', 'counter', 'parentListId'],
        state: {
            parentListId: () => ({
                value: -1,
                type: Number,
            }),
            isFull: () => ({
                value: false,
                type: Boolean,
            }),
            label: () => ({
                value: '-',
                type: String,
            }),
            index: () => ({
                value: -1,
                type: Number,
            }),
            counter: () => ({
                value: 1,
                type: Number,
            }),
            innerData: () => ({
                value: innerData[0],
                type: Array,
            }),
            isSelected: () => ({
                value: false,
                type: Boolean,
            }),
            isMounted: () => ({
                value: false,
                type: Boolean,
            }),
        },
        child: [
            DynamicCounter,
            DynamicListEmpty,
            DynamicListCardInner,
            DynamicListButton,
        ],
    })
);
