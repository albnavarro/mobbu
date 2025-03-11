//@ts-check

import { MobJs } from '../../../../mobjs';
import { HorizontalScrollerSectionFn } from './horizontalScrollerSection';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const HorizontalScrollerSection = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').HorizontalScrollerSection>} */
    ({
        name: 'horizontal-scroller-section',
        component: HorizontalScrollerSectionFn,
        exportState: ['id', 'pinClass'],
        state: {
            id: () => ({
                value: -1,
                type: Number,
            }),
            pinClass: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
