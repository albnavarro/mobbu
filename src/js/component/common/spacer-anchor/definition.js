import { MobJs } from '@mobJs';
import { SpacerAnchorFn } from './spacer-anchor';

/**
 * @import {CreateComponentParams} from "@mobJsType"
 */

export const SpacerAnchor = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').SpacerAnchor>} */
    ({
        tag: 'mob-spacer',
        component: SpacerAnchorFn,
        props: {
            style: {
                __value: 'x-small',
                __type: String,
                __validate: (val) =>
                    ['x-small', 'small', 'medium', 'big'].includes(val),
                __strict: true,
            },
            id: {
                __value: '',
                __type: String,
            },
            label: {
                __value: '',
                __type: String,
            },
            isSection: {
                __value: false,
                __type: Boolean,
            },
            isNote: {
                __value: false,
                __type: Boolean,
            },
        },
    })
);
