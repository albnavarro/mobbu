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
            style: () => ({
                value: 'x-small',
                type: String,
                validate: (val) =>
                    ['x-small', 'small', 'medium', 'big'].includes(val),
                strict: true,
            }),
            id: () => ({
                value: '',
                type: String,
            }),
            label: () => ({
                value: '',
                type: String,
            }),
            isSection: () => ({
                value: false,
                type: Boolean,
            }),
            isNote: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
