//@ts-check

import { MobJs } from '@mobJs';
import { TitleFn } from './title';

/**
 * @import {CreateComponentParams} from "@mobJsType";
 */

export const Title = MobJs.createComponent(
    /** @type {CreateComponentParams<import('./type').Title>} */
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
                value: 'inherit',
                type: String,
                validate: (val) => {
                    return ['inherit', 'white', 'hightlight', 'black'].includes(
                        val
                    );
                },
            }),
            isBold: () => ({
                value: false,
                type: Boolean,
            }),
        },
    })
);
