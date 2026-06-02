import { MobJs } from '@mobJs';
import { AnchorButtonFn } from './anchor-button';

/**
 * @import {CreateComponentParams} from '@mobJsType'
 */

export const AnchorButton = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').AnchorBUtton>} */
    ({
        tag: 'anchor-button',
        component: AnchorButtonFn,
        props: {
            anchor: {
                __value: '',
                __type: String,
            },
            content: {
                __value: '',
                __type: String,
            },
        },
    })
);
