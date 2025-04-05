//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { AnchorButtonFn } from './AnchorButton';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const AnchorButton = MobJs.createComponent(
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
