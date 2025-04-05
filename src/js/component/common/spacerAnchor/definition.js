//@ts-check

import { MobJs } from '../../../mob/mobjs';
import { SpacerAnchorFn } from './spacerAnchor';

/**
 * @import { CreateComponentParams } from "../../../mob/mobjs/type";
 **/

export const SpacerAnchor = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').SpacerAnchor>} */
    ({
        name: 'mob-spacer',
        component: SpacerAnchorFn,
        exportState: ['style', 'line', 'id', 'label'],
        state: {
            style: () => ({
                value: 'medium',
                type: String,
                validate: (val) => ['small', 'medium', 'big'].includes(val),
                strict: true,
            }),
            line: () => ({
                value: false,
                type: Boolean,
            }),
            id: () => ({
                value: '',
                type: String,
            }),
            label: () => ({
                value: '',
                type: String,
            }),
        },
    })
);
