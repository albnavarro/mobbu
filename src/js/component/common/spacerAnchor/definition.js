//@ts-check

import { createComponent } from '../../../mobjs';
import { SpacerAnchorFn } from './spacerAnchor';

/**
 * @import { CreateComponentParams } from "../../../mobjs/type";
 **/

export const SpacerAnchor = createComponent(
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
