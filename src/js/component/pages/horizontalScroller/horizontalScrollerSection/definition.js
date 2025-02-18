//@ts-check

import { createComponent } from '../../../../mobjs';
import { HorizontalScrollerSectionFn } from './horizontalScrollerSection';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const HorizontalScrollerSection = createComponent(
    /** @type{CreateComponentParams<import('./type').HorizontalScrollerSection>} */
    ({
        name: 'horizontal-scroller-section',
        component: HorizontalScrollerSectionFn,
        exportState: ['id', 'pinClass'],
        state: {
            id: () => ({
                id: -1,
                type: Number,
            }),
            pinClass: () => ({
                id: '',
                type: String,
            }),
        },
    })
);
