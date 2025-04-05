//@ts-check

import { MobJs } from '../../../../mob/mobjs';
import { TitleFn } from './title';

/**
 * @import { CreateComponentParams } from "../../../../mob/mobjs/type";
 **/

export const Title = MobJs.createComponent(
    /** @type{CreateComponentParams<import('./type').Title>} */
    ({
        name: 'mob-title',
        component: TitleFn,
        exportState: ['tag', 'color', 'isBold'],
        state: {
            tag: () => ({
                value: 'h1',
                type: String,
            }),
            color: () => ({
                value: 'black',
                type: String,
                validate: (val) => {
                    return ['white', 'hightlight', 'black'].includes(val);
                },
            }),
            isBold: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
