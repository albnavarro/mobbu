import { MobJs } from '@mobJs';
import { AnchorButtonFn } from './anchor-button';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const AnchorButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnchorBUtton>} */
    ({
        tag: 'anchor-button',
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
