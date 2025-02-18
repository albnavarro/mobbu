//@ts-check

import { createComponent } from '../../../../mobjs';
import { AnchorButtonFn } from './AnchorButton';

/**
 * @import { CreateComponentParams } from "../../../../mobjs/type";
 **/

export const AnchorButton = createComponent(
    /** @type{CreateComponentParams<import('./type').AnchorBUtton>} */
    ({
        name: 'anchor-button',
        component: AnchorButtonFn,
        exportState: ['anchor', 'content'],
        state: {
            anchor: () => ({
                value: '',
                type: String,
            }),
            content: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
